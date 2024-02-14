// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err: Error | null) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  },
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY,
        title TEXT,
        body TEXT
      )`,
    (err: Error) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created articles table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM articles`, (err: Error) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from articles");

        // Insert new data into the products table
        const values1 = [
          "Article 1",
          "# Le premier\nLe premier est toujours **sympa**.",
        ];
        const values2 = [
          "Article 2",
          "# Le deuxième\nLe deuxième *n&apos;est jamais très loin*.",
        ];
        const values3 = [
          "Article 3",
          "# Le troisème\nLe `troisième` est toujours le bon.",
        ];

        const insertSql = `INSERT INTO articles(title, body) VALUES(?, ?)`;

        db.run(
          insertSql,
          values1,
          function (this: { lastID: number }, err: Error) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          },
        );

        db.run(
          insertSql,
          values2,
          function (this: { lastID: number }, err: Error) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          },
        );

        db.run(
          insertSql,
          values3,
          function (this: { lastID: number }, err: Error) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          },
        );

        //   Close the database connection after all insertions are done
        db.close((err: Error | null) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    },
  );
});
