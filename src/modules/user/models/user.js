import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database.js";
import { Image } from "./image.js";
import {calculateDistance} from "../../../utils/location.js"
//import { Gender } from "../../gender/models/gender.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      underscored: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    biography: {
      type: DataTypes.STRING,
    },
    lastRequest: {
      type: DataTypes.DATE,
    },
    distancePreference: {
      type: DataTypes.INTEGER,
    },
    lookingForId: {
      type: DataTypes.UUID,
    },
    minAge: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
    },
    maxAge: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Image, {
  foreinkey: "userId",
  sourceKey: "id",
});

