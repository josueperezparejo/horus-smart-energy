import { pool } from "../../db/db.js";
import { handleError } from "../../utils/index.js";

export const deviceResolvers = {
  Query: {
    getDevices: async () => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM devices WHERE visible = true AND deleted_at IS NULL');
        return result.rows;
      } catch (error) {
        handleError(error, "Error al obtener los dispositivos");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    getDeviceById: async (_, { id }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM devices WHERE id = $1 AND visible = true AND deleted_at IS NULL', [id]);
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al obtener el dispositivo");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  },
  Mutation: {
    createDevice: async (_, { projectId, name, type, visible }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "INSERT INTO devices (project_id, name, type, visible) VALUES ($1, $2, $3, $4) RETURNING *",
          [projectId, name, type, visible]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al crear el dispositivo");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    updateDevice: async (_, { id, name, type, visible }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "UPDATE devices SET name = $1, type = $2, visible = $3 WHERE id = $4 RETURNING *",
          [name, type, visible, id]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al actualizar el dispositivo");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    softDeleteDevice: async (_, { id }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "UPDATE devices SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
          [id]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al eliminar el dispositivo");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  }
};