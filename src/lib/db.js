import "server-only";

import { MongoClient, ServerApiVersion } from "mongodb";
if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!");
}
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance = null;

async function getDB(dbName) {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log(">>>>Connected to MongoDB<<<<");
      dbInstance = client.db(dbName);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Database connection failed");
    }
  }
  return dbInstance;
}

export async function getCollection(collectionName) {
  const db = await getDB("Quote");
  if (db) return db.collection(collectionName);
  return null;
}

export async function deleteOldSuggestions() {
  const collection = await getCollection("suggestions");
  if (!collection) {
    console.error("No se pudo obtener la colección");
    return;
  }
  // Calcula la fecha de hace 7 días
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const result = await collection.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    console.log(`${result.deletedCount} sugerencias antiguas eliminadas.`);
  } catch (error) {
    console.error("Error al eliminar sugerencias antiguas:", error);
  }
}

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});