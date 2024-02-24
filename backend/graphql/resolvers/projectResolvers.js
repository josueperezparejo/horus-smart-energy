import { pool } from "../../db/db.js";
import { handleError } from "../../utils/index.js";

export const projectResolvers = {
  Query: {
    getProjects: async () => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM projects WHERE enabled = true AND deleted_at IS NULL');
        const projects = result.rows;
        
        for (let i = 0; i < projects.length; i++) {
          const projectId = projects[i].id;
          const devicesResult = await client.query('SELECT * FROM devices WHERE project_id = $1 AND deleted_at IS NULL', [projectId]);
          projects[i].devices = devicesResult.rows;
        }

        return projects;
      } catch (error) {
        handleError(error, "Error al cargar los poyectos"); 
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    getProjectById: async (_, { id }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query('SELECT * FROM projects WHERE id = $1 AND deleted_at IS NULL', [id]);
        const project = result.rows[0];

        // Si el proyecto existe, obtenemos sus dispositivos
        if (project) {
          const devicesResult = await client.query('SELECT * FROM devices WHERE project_id = $1 AND deleted_at IS NULL', [id]);
          project.devices = devicesResult.rows;
        }

        return project;
      } catch (error) {
        handleError(error, "Error al cargar el proyecto");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  },
  Mutation: {
    createProject: async (_, { name, enabled, time_zone, created_by }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "INSERT INTO projects (name, enabled, time_zone, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, enabled, time_zone, created_by]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al crear el proyecto");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    updateProject: async (_, { id, name, enabled, time_zone }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "UPDATE projects SET name = $1, enabled = $2, time_zone = $3 WHERE id = $4 AND deleted_at IS NULL RETURNING *",
          [name, enabled, time_zone, id]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al actualizar el proyecto");
      } finally {
        if (client) {
          client.release();
        }
      }
    },
    softDeleteProject: async (_, { id }) => {
      let client;
      try {
        client = await pool.connect();
        const result = await client.query(
          "UPDATE projects SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *",
          [id]
        );
        return result.rows[0];
      } catch (error) {
        handleError(error, "Error al eliminar el proyecto");
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  }
};