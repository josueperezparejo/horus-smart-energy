import { pool } from '../../db/db.js';
import { 
  generateToken, 
  comparePassword, 
  hashPassword, 
  authMiddleware
} from '../../middlewares/auth.js';
import { handleError } from '../../utils/index.js';

export const userResolvers = {
  Query: {
    getUsers: async () => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE deleted_at IS NULL');
        const users = result.rows;

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const projectsResult = await client.query('SELECT * FROM projects WHERE created_by = $1 AND deleted_at IS NULL', [user.id]);
          users[i].projects = projectsResult.rows;
        }

        return users;
      } catch (error) {
        handleError(error, "Error al cargar los usuarios");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    getUserById: async (_, { id }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        const user = result.rows[0];

        // Obtenemos los proyectos del usuario
        const projectsResult = await client.query('SELECT * FROM projects WHERE created_by = $1 AND deleted_at IS NULL', [id]);
        user.projects = projectsResult.rows;

        return user;
      } catch (error) {
        handleError(error, "Error al cargar el usuario");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  },
  Mutation: {
    login: async (_, { username, password }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL', [username]);
        const user = result.rows[0];
        if (!user || !(await comparePassword(password, user.password))) {
          throw new Error('Invalid credentials');
        }
        const token = generateToken(user.id);
        return {
          token,
          user: {
            id: user.id,
            username: user.username
          }
        };
      } catch (error) {
        handleError(error, "Error al iniciar sesión");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    createUser: async (_, { username, password }) => {
      const hashedPassword = await hashPassword(password);
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al crear el usuario");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    updateUser: async (_, { id, username, password }, { req }) => {
      if (!authMiddleware(id, req)) {
        throw new Error('Unauthorized user');
      }

      let client;
      try {
        const hashedPassword = await hashPassword(password);
        client = await pool.connect();
        const result = await client.query('UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, hashedPassword, id]);
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al actualizar el usuario");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    softDeleteUser: async (_, { id }, { req }) => {
      if (!authMiddleware(id, req)) {
        throw new Error('Unauthorized user');
      }

      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          'UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *',
          [id]
        );

        if (result.rows.length > 0) {
          return result.rows[0];
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        handleError(error, "Error al eliminar el usuario");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  }
};