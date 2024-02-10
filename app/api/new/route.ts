import sqlite3 from "sqlite3";
import path from "path";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function POST(req: Request) {
  const dbPath = path.resolve("database", "collection.db");

  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  const newArticle = await req.json();

  try {
    db.run(
      "INSERT INTO articles(title, body) VALUES(?, ?)",
      Object.values(newArticle),
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ res: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
