## Dependencias de Producción

- **apollo-server-express**
- **bcrypt**
- **dotenv**
- **express**
- **graphql**
- **jsonwebtoken**
- **pg**

## Dependencias de Desarrollo

- **nodemon**

## Scripts Disponibles

- **dev**: Inicia el servidor utilizando nodemon para reiniciar automáticamente cuando se realizan cambios en el código. Ejecute con `npm run dev`.
- **start**: Inicia el servidor utilizando el comando `node index.js`. Ejecute con `npm start`.
- **extra**: Ejecuta un script adicional ubicado en `./backend/extra/extra.js` utilizando nodemon para reiniciar automáticamente. Ejecute con `npm run extra`.

# Esquema de Base de Datos

Este repositorio contiene el esquema de base de datos para una prueba de backend de la empresa Horus Smart Energy. El esquema incluye tablas para Usuarios, Proyectos y Dispositivos.

![Diagrama de Base de Datos](./backend/assets/horus_smart_energy.png)

Para ver el esquema detallado de la base de datos, incluyendo tablas y relaciones, por favor visita el siguiente enlace:

[Ver Esquema de Base de Datos en dbdiagram](<https://dbdiagram.io/d/horus_smart_energy-65da28455cd0412774b96291>)

# Horus Documentacion API

Horus API: Sistema de Gestión de Usuarios y Proyectos

**Tipos de Datos:**

- `User`: Representa un usuario en el sistema.
  - `id`: ID del usuario (tipo Int)
  - `username`: Nombre de usuario (tipo String)
  - `projects`: Lista de proyectos asociados al usuario (tipo [Project])

- `AuthPayload`: Información de autenticación devuelta después de iniciar sesión.
  - `token`: Token de autenticación generado (tipo String)
  - `user`: Usuario autenticado (tipo User)

- `Project`: Representa un proyecto en el sistema.
  - `id`: ID del proyecto (tipo Int)
  - `name`: Nombre del proyecto (tipo String)
  - `enabled`: Estado de habilitación del proyecto (tipo Boolean)
  - `time_zone`: Zona horaria del proyecto (tipo String)
  - `created_by`: ID del usuario creador del proyecto (tipo Int)
  - `devices`: Lista de dispositivos asociados al proyecto (tipo [Device])

- `Device`: Representa un dispositivo en el sistema.
  - `id`: ID del dispositivo (tipo Int)
  - `name`: Nombre del dispositivo (tipo String)
  - `type`: Tipo de dispositivo (tipo String)
  - `visible`: Estado de visibilidad del dispositivo (tipo Boolean)

## Users

### getUsers

Obtiene la lista de todos los usuarios.

Tipo de consulta: Query

```graphql
query{
  getUsers {
    id
    username
  }
}
```

Tipo de retorno: Lista de objetos User

```graphql
{
    "data": {
        "getUsers": [
            {
                "id": 1,
                "username": "user"
            },
            {
                "id": 2,
                "username": "user"
            },
            {
                "id": 3,
                "username": "user"
            }
        ]
    }
}
```

### getUserById

Obtiene un usuario por su ID.

Tipo de consulta: Query

Parámetros:

- `id`: ID del usuario (requerido)

```graphql
query{
  getUserById(id: 1) {
    id
    username
  }
}
```

Tipo de retorno: Objeto User

```graphql
{
    "data": {
        "getUserById": {
            "id": 1,
            "username": "user"
        }
    }
}
```

### createUser

Crea un nuevo usuario.

Tipo de consulta: Mutation

Parámetros:

- `username`: Nombre de usuario (requerido)
- `password`: Contraseña del usuario (requerido)

```graphql
mutation{
  createUser(username: "user", password: "password") {
    id
    username
  }
}
```

Tipo de retorno: Objeto User

```graphql
{
    "data": {
        "createUser": {
            "id": 1,
            "username": "user"
        }
    }
}
```

### login

Inicia sesión de usuario.

Tipo de consulta: Mutation

Parámetros:

- `username`: Nombre de usuario (requerido)
- `password`: Contraseña del usuario (requerido)

```graphql
mutation{
  login(username: "user", password: "password") {
    token
    user {
      id
      username
    }
  }
}
```

Tipo de retorno: Objeto AuthPayload

```graphql
{
    "data": {
        "login": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImJWTToken3NywiZXhwIjoxNzA4ODM4OTc3fQ._-RKUlXem83SIGFVLmP55x6yF1N9p02G0FugM2PJQjY",
            "user": {
                "id": 1,
                "username": "user"
            }
        }
    }
}
```

### updateUser

Actualiza un usuario existente.

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del usuario (requerido)
- `username`: Nuevo nombre de usuario (requerido)
- `password`: Nueva contraseña del usuario (requerido)

You must include the "Authorization" header with a valid JWT token.

```graphql
mutation{
  updateUser(id: 2, username: "user updated", password: "password updated") {
    id
    username
  }
}
```

Tipo de retorno: Objeto User

```graphql
{
    "data": {
        "updateUser": {
            "id": 1,
            "username": "user updated"
        }
    }
}
```

### softDeleteUser

Desactiva un usuario.

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del usuario (requerido)

You must include the "Authorization" header with a valid JWT token.

```graphql
mutation{
  softDeleteUser(id: 1) {
    id
    username
  }
}
```

Tipo de retorno: Objeto User

```graphql
{
    "data": {
        "softDeleteUser": {
            "id": 1,
            "username": "user"
        }
    }
}
```

## Projects

### getProjects

Obtiene la lista de todos los proyectos.

Tipo de consulta: Query

```graphql
query{
  getProjects {
    enabled
    id
    name
    time_zone
    created_by
  }
}
```

Tipo de retorno: Lista de objetos Project

```graphql
{
    "data": {
        "getProjects": [
            {
                "enabled": true,
                "id": 1,
                "name": "first project",
                "time_zone": "2024-02-24",
                "created_by": 1
            },
             {
                "enabled": true,
                "id": 2,
                "name": "second project",
                "time_zone": "2024-02-24",
                "created_by": 1
            }
        ]
    }
}
```

### getProjectById

Obtiene un proyecto por su ID.

Tipo de consulta: Query

Parámetros:

- `id`: ID del proyecto (requerido)

```graphql
query{
  getProjectById(id: 1) {
    created_by
    enabled
    id
    name
    time_zone
  }
}
```

Tipo de retorno: Objeto Project

```graphql
{
    "data": {
        "getProjectById": {
            "created_by": 1,
            "enabled": true,
            "id": 1,
            "name": "first project",
            "time_zone": "2024-02-24"
        }
    }
}
```

### createProject

Crea un nuevo proyecto.

Tipo de consulta: Mutation

Parámetros:

- `name`: Nombre del proyecto (requerido)
- `enabled`: Estado de habilitación del proyecto (requerido)
- `time_zone`: Zona horaria del proyecto (requerido)
- `created_by`: ID del usuario creador del proyecto (requerido)

```graphql
mutation{
  createProject(name: "first project", enabled: true, time_zone: "2024-02-24", created_by: 1) {
    created_by
    enabled
    id
    name
    time_zone
  }
}
```

Tipo de retorno: Objeto Project

```graphql
{
    "data": {
        "createProject": {
            "created_by": 1,
            "enabled": true,
            "id": 1,
            "name": "first project",
            "time_zone": "2024-02-24"
        }
    }
}
```

### updateProject

Actualiza un proyecto existente.

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del proyecto (requerido)
- `name`: Nuevo nombre del proyecto (requerido)
- `enabled`: Nuevo estado de habilitación del proyecto (requerido)
- `time_zone`: Nueva zona horaria del proyecto (requerido)
- `created_by`: Nuevo ID del usuario creador del proyecto (opcional)

```graphql
mutation{
  updateProject(id: 1, name: "first project updated", enabled: true, time_zone: "2024-02-24") {
    created_by
    enabled
    id
    name
    time_zone
  }
}
```

Tipo de retorno: Objeto Project

```graphql
{
    "data": {
        "updateProject": {
            "created_by": 1,
            "enabled": true,
            "id": 1,
            "name": "first project updated",
            "time_zone": "2024-02-24"
        }
    }
}
```

### softDeleteProject

Desactiva un proyecto (eliminación suave).

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del proyecto (requerido)

```graphql
mutation{
  softDeleteProject(id: 1) {
    created_by
    enabled
    id
    name
    time_zone
  }
}
```

Tipo de retorno: Objeto Project

```graphql
{
    "data": {
        "softDeleteProject": {
            "created_by": 1,
            "enabled": true,
            "id": 1,
            "name": "first project",
            "time_zone": "2024-02-24"
        }
    }
}
```

## Devices

### getDevices

Obtiene la lista de todos los dispositivos.

Tipo de consulta: Query

```graphql
query{
  getDevices {
    id
    name
    type
    visible
  }
}
```

Tipo de retorno: Lista de objetos Device

```graphql
{
    "data": {
        "getDevices": [
            {
                "id": 1,
                "name": "first device",
                "type": "comercial",
                "visible": true
            },
            {
                "id": 2,
                "name": "second device",
                "type": "comercial",
                "visible": true
            }
        ]
    }
}
```

### getDeviceById

Obtiene un dispositivo por su ID.

Tipo de consulta: Query

Parámetros:

- `id`: ID del dispositivo (requerido)

```graphql
query{
  getDeviceById(id: 1) {
    id
    name
    type
    visible
  }
}
```

Tipo de retorno: Objeto Device

```graphql
{
    "data": {
        "getDeviceById": {
            "id": 1,
            "name": "first device",
            "type": "private",
            "visible": true
        }
    }
}
```

### createDevice

Crea un nuevo dispositivo asociado a un proyecto.

Tipo de consulta: Mutation

Parámetros:

- `name`: Nombre del dispositivo (requerido)
- `type`: Tipo de dispositivo (requerido)
- `visible`: Estado de visibilidad del dispositivo (requerido)

```graphql
mutation{
  createDevice(projectId: 1, name: "first device", type: "private", visible: true) {
    id
    name
    type
    visible
  }
}
```

Tipo de retorno: Objeto Device

```graphql
{
    "data": {
        "createDevice": {
            "id": 1,
            "name": "first device",
            "type": "private",
            "visible": true
        }
    }
}
```

### updateDevice

Actualiza un dispositivo existente.

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del dispositivo (requerido)
- `name`: Nuevo nombre del dispositivo (requerido)
- `type`: Nuevo tipo de dispositivo (requerido)
- `visible`: Nuevo estado de visibilidad del dispositivo (requerido)

```graphql
mutation{
  updateDevice(id: 1, name: "first device updated", type: "public", visible: true) {
    id
    name
    type 
    visible
  }
}
```

Tipo de retorno: Objeto Device

```graphql
{
    "data": {
        "updateDevice": {
            "id": 1,
            "name": "first device updated",
            "type": "public",
            "visible": true
        }
    }
}
```

### softDeleteDevice

Desactiva un dispositivo (eliminación suave).

Tipo de consulta: Mutation

Parámetros:

- `id`: ID del dispositivo (requerido)

```graphql
mutation{
  softDeleteDevice(id: 1) {
    id
    name
    type
    visible
  }
}
```

Tipo de retorno: Objeto Device

```graphql
{
    "data": {
        "softDeleteDevice": {
            "id": 1,
            "name": "first device",
            "type": "private",
            "visible": true
        }
    }
}
```