import SQLite from "react-native-sqlite-storage";

class Note {
    constructor() {
        this.db = SQLite.openDatabase(
            { name: "notes.db", location: "default" },
            () => {
                console.log("Database opened successfully.");
            },
            error => {
                console.log("Error opening database: ", error);
            },
        );

        // Ensure the table is created when the class instance is created
        this.createTable();
    }

    createTable() {
        this.db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS notes
                 (
                     id        INTEGER PRIMARY KEY AUTOINCREMENT,
                     title     TEXT,
                     content   TEXT,
                     date      TEXT,
                     category  TEXT,
                     pinned    INTEGER DEFAULT 0,
                     thumbnail TEXT
                 )`,
                [],
                () => {
                    console.log("Table created successfully.");
                },
                error => {
                    console.log("Error creating table: ", error);
                },
            );
        });
    }

    addNote = (item) => {
        return new Promise((resolve, reject) => {
            let keys = Object.keys(item);
            let values = Object.values(item);

            // Construct the SQL query dynamically
            let placeholders = keys.map(() => "?").join(", ");
            let sql = `INSERT INTO notes (${keys.join(", ")})
                       VALUES (${placeholders})`;

            this.db.transaction(txn => {
                txn.executeSql(
                    sql,
                    values,
                    (tx, res) => {
                        console.log("Record inserted successfully.");
                        resolve(res.insertId); // Resolve with the ID of the inserted note
                    },
                    error => {
                        console.log("Error inserting note: ", error);
                        reject(error);
                    },
                );
            });
        });
    };

    // Read operation (SELECT)
    getNotes = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(txn => {
                txn.executeSql(
                    "SELECT * FROM notes",
                    [],
                    (tx, res) => {
                        let notes = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            notes.push(res.rows.item(i));
                        }
                        resolve(notes);
                    },
                    error => {
                        console.log("Error fetching notes: ", error);
                        reject(error);
                    },
                );
            });
        });
    };

    getNoteById = (id) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(txn => {
                txn.executeSql(
                    "SELECT * FROM notes where id = ?",
                    [id],
                    (tx, res) => {
                        const result = res.rows?.item(0) || null;
                        resolve(result);
                    },
                    error => {
                        reject(error);
                    },
                );
            });
        });
    };

    // Update operation (UPDATE)
    updateNote = ({
                      title,
                      content,
                      id,
                      category,
                  }) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(txn => {
                txn.executeSql(
                    "UPDATE notes SET title=?, category=?, content=? WHERE id=?",
                    [title, category, content, id],
                    (tx, res) => {
                        console.log("Record updated successfully.");
                        resolve(res.rowsAffected); // Resolve with the number of rows affected
                    },
                    error => {
                        console.log("Error updating note: ", error);
                        reject(error);
                    },
                );
            });
        });
    };

    // Delete operation (DELETE)
    deleteNote = (id) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(txn => {
                txn.executeSql(
                    "DELETE FROM notes WHERE id=?",
                    [id],
                    (tx, res) => {
                        console.log("Record deleted successfully.");
                        resolve(res.rowsAffected); // Resolve with the number of rows affected
                    },
                    error => {
                        console.log("Error deleting note: ", error);
                        reject(error);
                    },
                );
            });
        });
    };
}

export default new Note();
