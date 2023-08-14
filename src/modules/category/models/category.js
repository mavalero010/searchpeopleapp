import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";
export const Category = sequelize.define(
  "category",
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
    type: {
      type:  DataTypes.ENUM('Passion', 'Basic', 'Favorite Drink', "Language")    
    },

    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
  {
    timestamps: true,
  }
);
