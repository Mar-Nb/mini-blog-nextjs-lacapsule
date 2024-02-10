import sqlite3 from "sqlite3";
import path from "path";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db: Database | null = null;

// Define the GET request handler function
export async function GET(req: Request) {
  // Extract the "id" from the URL by splitting the URL and taking the last element
  const dbPath = path.resolve("database", "collection.db");
  const id = req.url.split("/").pop();

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  // Perform a database query to retrieve an item based on the id
  const article = await db.get("SELECT * FROM articles WHERE id = ?", id);

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(article), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
