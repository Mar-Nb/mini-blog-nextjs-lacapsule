import sqlite3 from "sqlite3";
import path from "path";
import { open, Database } from "sqlite";
import { NextRequest } from "next/server";

let db: Database | null = null;

// Define the GET request handler function
export async function GET(req: NextRequest) {
  const dbPath = path.resolve("database", "collection.db");
  const page = Number(req.nextUrl.searchParams.get("page"));

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  const articlesPerPage = 9;
  const offset = (page - 1) * articlesPerPage;
  const articles = await db.all(
    `SELECT * FROM articles ORDER BY createdAt DESC LIMIT ${articlesPerPage} OFFSET ${offset}`,
  );

  // Calculate total of pages (for an unknown reason, I can't return the right value directly from db)
  const { totalArticles } = await db.get(
    "SELECT COUNT(*) as totalArticles FROM articles",
  );
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return new Response(JSON.stringify({ articles, totalPages }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
