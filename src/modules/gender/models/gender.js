import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";
import { User } from "../../user/models/user.js";

export const Gender = sequelize.define(
  "gender",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  },
  {
    timestamps: false,
  }
);

Gender.hasOne(User, { foreinkey: "genderId", sourceKey: "id" });
