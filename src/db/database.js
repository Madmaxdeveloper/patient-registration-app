import { PGlite } from "@electric-sql/pglite";

const DB_CONFIG = {
  wasmSources: [
    "/pglite.wasm", // Local copy
    "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/pglite.wasm"
  ],
  dataSources: [
    "/pglite.data", // Local copy
    "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/pglite.data"
  ]
};

let dbInstance = null;

async function initializeDB(db) {
  try {
    // First check if the table exists (more reliable method)
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'patients'
      ) as exists;
    `);
    
    const tableExists = tableCheck[0].exists;
    
    if (!tableExists) {
      await db.query(`
        CREATE TABLE patients (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          date_of_birth DATE NOT NULL,
          gender TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          address TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Patients table created successfully");
    }
  } catch (error) {
    console.error("Table creation failed:", error);
    throw error;
  }
}

export async function getDatabase() {
  if (!dbInstance) {
    let lastError = null;
    
    for (let i = 0; i < DB_CONFIG.wasmSources.length; i++) {
      try {
        dbInstance = new PGlite({
          wasmUrl: DB_CONFIG.wasmSources[i],
          dataUrl: DB_CONFIG.dataSources[i]
        });
        
        // Wait for database to be ready
        await new Promise((resolve) => {
          dbInstance.on('ready', resolve);
          dbInstance.on('error', (err) => {
            console.error('DB connection error:', err);
            resolve(); // Continue anyway
          });
        });
        
        await initializeDB(dbInstance);
        console.log(`PGlite initialized with source ${i}`);
        return dbInstance;
      } catch (error) {
        lastError = error;
        console.warn(`Source ${i} failed:`, error);
        dbInstance = null;
      }
    }
    
    throw new Error("All PGlite sources failed: " + lastError?.message);
  }
  return dbInstance;
}

export async function executeQuery(query, params = []) {
  const db = await getDatabase();
  try {
    return await db.query(query, params);
  } catch (error) {
    console.error("Query Error:", { query, params, error });
    throw error;
  }
}