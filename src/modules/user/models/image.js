import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";

export const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  
      primaryKey: true,
    },
    urlImage: {
      type: DataTypes.STRING(500),
      allowNull: false
    },

    order: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    timestamps: false,
  }
);
