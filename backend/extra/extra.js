import { readFile } from 'fs/promises';

const filePath = './backend/extra/data.json';

// Función para leer el archivo JSON
const readJSONFile = async (filePath) => {
  try {
    // Leer el archivo JSON de forma asíncrona
    const data = await readFile(filePath, 'utf8');
    // Parsear el contenido del archivo JSON a un objeto JavaScript
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    throw error;
  }
};

// Función para contar registros de "temperature-sensor"
const countTemperatureSensors = async (data) => {
  return data.filter(device => device.type === 'temperature-sensor').length;
};

// Función para contar dispositivos en el proyecto con ID 3
const countDevicesInProjectId3 = async (data) => {
  return data.filter(device => device.ProjectId === 3).length;
};

// Función para encontrar el dispositivo más usado
const findMostUsedDevice = async (data) => {
  const devicesCountMap = {};
  data.forEach(device => {
    devicesCountMap[device.type] = (devicesCountMap[device.type] || 0) + 1;
  });

  let mostUsedDevice = null;
  let maxCount = 0;
  for (const deviceType in devicesCountMap) {
    if (devicesCountMap[deviceType] > maxCount) {
      mostUsedDevice = deviceType;
      maxCount = devicesCountMap[deviceType];
    }
  }

  return mostUsedDevice;
};

// Función para encontrar dispositivos con estado "disabled" para un proyecto específico
const findDisabledDevicesByProjectId = async (data, projectId) => {
  return data.filter(device => device.ProjectId === projectId && device.state === 'disabled');
};

const processData = async () => {
    try {
      // Leer el archivo JSON
      const { data } = await readJSONFile(filePath);
  
      // Realizar las operaciones necesarias con los datos leídos
      const temperatureSensorCount = await countTemperatureSensors(data);
      const projectId3DeviceCount = await countDevicesInProjectId3(data);
      const mostUsedDevice = await findMostUsedDevice(data);
      const disabledDevicesInProject3 = await findDisabledDevicesByProjectId(data, 3);
  
      // Imprimir los resultados
      console.log('Cantidad de "temperature-sensor":', temperatureSensorCount);
      console.log('Cantidad de dispositivos en el proyecto con ID 3:', projectId3DeviceCount);
      console.log('Dispositivo más usado en todos los proyectos:', mostUsedDevice);
      console.log('Dispositivos con estado "disabled" para el proyecto con ID 3:', disabledDevicesInProject3);
    } catch (error) {
      // Manejar errores de lectura del archivo JSON
      console.error('Error al leer el archivo JSON:', error);
    }
  }
  
  processData();