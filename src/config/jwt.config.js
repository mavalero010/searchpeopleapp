import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

export const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const getUnexpiredToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};
export const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        //TODO: Investigar que tipo de res.status() se acomoda a este error
      }
    } else {
      data = decoded;
    }
  });

  return data;
};

export const authTokenDecoded = (dataUserDecoded, user) => {
  //Verificar que los datos son válidos
  //Busco usuario mediante Email en el DB
  let r = true;
  if (user === null) {
    r = false;
  }
  //Comparo contraseñas
  const compare = bcrypt.compare(dataUserDecoded.data.password, user.password);
  if (!compare) {
    r = false;
  }
  return r;
};