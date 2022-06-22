import { BaseDatabase } from "./BaseDatabase";

class Migrations extends BaseDatabase {
  createTable = () => {
    BaseDatabase.connection
      .raw(
        `
      CREATE TABLE IF NOT EXISTS Bikes(
        id VARCHAR(255) PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        march VARCHAR(255) NOT NULL,
        mark VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        quantity_stock INT NOT NULL
      );
    `
      )
      .then(() => {
        console.log("Tabela(s) criada(s)");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
const migrations: Migrations = new Migrations();
migrations.createTable();
