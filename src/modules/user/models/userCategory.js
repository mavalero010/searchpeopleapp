import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";
import {Category} from "../../category/models/category.js"
import {User} from "../../user/models/user.js"

export const UserCategory = sequelize.define(
  "user_category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);
Category.belongsToMany(User, { through: 'user_category' });
User.belongsToMany(Category, { through: 'user_category' });