import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";

export const Match = sequelize.define(
  "match",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    secondUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    likeByFirstUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    likeBySecondUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);
