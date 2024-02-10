import sqlite3 from "sqlite3";
import path from "path";
import { open, Database } from "sqlite";

let db: Database | null = null;

// Define the GET request handler function
export async function GET() {
  const dbPath = path.resolve("database", "collection.db");

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  // Perform a database query to retrieve all articles from the "articles" table
  const articles = await db.all("SELECT * FROM articles");

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(articles), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
