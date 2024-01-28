// eslint-disable-next-line @typescript-eslint/no-var-requires
var sqlite3 = require('sqlite3').verbose();
// Connecting to or creating a new SQLite database file
var db = new sqlite3.Database('collection.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
// Serialize method ensures that database queries are executed sequentially
db.serialize(function () {
    // Create the items table if it doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS articles (\n        id INTEGER PRIMARY KEY,\n        title TEXT,\n        body TEXT\n      )", function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Created articles table.');
        // Clear the existing data in the products table
        db.run("DELETE FROM articles", function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log('All rows deleted from articles');
            // Insert new data into the products table
            var values1 = [
                'Article 1',
                '# Le premier\nLe premier est toujours **sympa**.'
            ];
            var values2 = [
                'Article 2',
                '# Le deuxième\nLe deuxième *n&apos;est jamais très loin*.'
            ];
            var values3 = [
                'Article 3',
                '# Le troisème\nLe `troisième` est toujours le bon.'
            ];
            var insertSql = "INSERT INTO articles(title, body) VALUES(?, ?)";
            db.run(insertSql, values1, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                var id = this.lastID; // get the id of the last inserted row
                console.log("Rows inserted, ID ".concat(id));
            });
            db.run(insertSql, values2, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                var id = this.lastID; // get the id of the last inserted row
                console.log("Rows inserted, ID ".concat(id));
            });
            db.run(insertSql, values3, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                var id = this.lastID; // get the id of the last inserted row
                console.log("Rows inserted, ID ".concat(id));
            });
            //   Close the database connection after all insertions are done
            db.close(function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed the database connection.');
            });
        });
    });
});
