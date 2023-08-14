import { User } from "../models/user.js";
import { Gender } from "../../gender/models/gender.js";
import { Image } from "../models/image.js";

import Sequelize from "sequelize";
import { Op } from "sequelize";

import multer from 'multer'


import { sequelize } from "../../../database/database.js";
import { calculateDistance } from "../../../utils/location.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
}  from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import dotenv from "dotenv"
dotenv.config();

const limitprofile = process.env.LIMIT_PROFILE_IMAGE
const bucketProfilePhoto = process.env.BUCKET_PROFILE_PHOTO;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_BACKEND;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    let findUser = await User.findOne({ where: { email: user.email } });
    if (findUser !== null) {
      return res.status(404).json({ message: "Usuario ya existe" });
    }
    let newUser = await User.create(user);
    return res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNearPeople = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      return res.status(404).json({ message: "User no existe" });
    }
    const conversionFactorMilesToMeters = 1609.34;
    const distanceThresholdInMeters = user.dataValues.distancePreference * 1000;
    const userLocation = {
      lat: user.dataValues.latitude,
      lon: user.dataValues.longitude,
    };
    const genderPreference = user.dataValues.lookingForId;
    let nearUsers = await User.findAll({
      where: {
        latitude: {
          [Op.not]: null,
        },
        longitude: {
          [Op.not]: null,
        },
        genderId: genderPreference,
        [Op.and]: Sequelize.literal(`
          SQRT(
            POW(69.1 * (latitude - ${userLocation.lat}) * ${conversionFactorMilesToMeters}, 2) +
            POW(69.1 * (${userLocation.lon} - longitude) * COS(latitude / 57.3) * ${conversionFactorMilesToMeters}, 2)
          ) < ${distanceThresholdInMeters}
        `),
      },
    }).catch((error) => {
        return res.status(500).json(error);
      });

      if(nearUsers === null){
        return res.status(404).json({message: "No se encontraron Users cerca"})
      }

      let users = []
      for (let index = 0; index < nearUsers.length; index++) {
        let us = nearUsers[index]
        if(us.id != userId){
          us.dataValues.gender = (await Gender.findOne({where:{id:us.genderId}})).dataValues.name
          us.dataValues.lookingFor = (await Gender.findOne({where:{id:us.genderId}})).dataValues.name
          users.push(us.dataValues)
        }
      }
      
      res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      return res.status(404).json({ message: "User no existe" });
    }

    res.json(user.dataValues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.query;
    await User.findOne({
      where: {
        id: userId,
      },
    })
      .then(async (user) => {
        if (user !== null) {
          await user.destroy();
          return res
            .status(200)
            .json({ message: "Registro eliminado con éxito" });
        } else {
          return res.status(200).json({ message: "Registro ya fue eliminado" });
        }
      })
      .catch((error) => {
        // Manejar el error
        return res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    await User.findAll()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadImage = async (req, res, file) => {
  try {

    const userId = "3367eaca-7192-45cd-9e0a-690e92422118";
    

    const imageName = file.originalname;
    
    
    const l = await Image.findAll({where: {userId}})

    if(l.length>=limitprofile){
      return res.status(401).json({message:"Limite de fotos alcanzado"})
    }

    const params = {
      Bucket: bucketProfilePhoto,
      Key: imageName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    let command = new PutObjectCommand(params);
    await s3.send(command);
    const getObjectParams = {
      Bucket: bucketProfilePhoto,
      Key: imageName,
    };
     command = new GetObjectCommand(getObjectParams);
    let urlImage = (await getSignedUrl(s3, command)) //.split("?")[0];
    const newImage = {
        urlImage,
        order:l.length+1,
        userId
    }
   await Image.create(newImage).then((ima)=>{return res.status(200).json(ima)}).catch((error) => {
      return res.status(500).json(error);
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}