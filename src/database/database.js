import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "searchpeopleappdb",
  "michaelvalero",
  "",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
