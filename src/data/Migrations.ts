import { BaseDatabase } from "./BaseDatabase";

class Migrations extends BaseDatabase {
  createTable() {
    this.connection.raw(`

    `);
  }
}
const migrations = new Migrations();
migrations.createTable();
