import { Gender } from "../models/gender.js";

export async function createGender(req, res) {
 
  try {
    const  {name}  = req.body;
    let newGender = await Gender.create({ name });
    return res.json(newGender);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getGenderByIdUser(req, res) {
  try {
    const userId = req.query.userId;
    console.log(userId);
    let newGender = await Gender.findOne({
      where: {
        id: userId,
      },
    })
      .then((gender) => {
        return res.json(gender);
      })
      .catch((error) => {
        // Manejar el error
        console.log(error);
        return res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteGender(req, res) {
  try {
    const { id } = req.query;
    let newGender = await Gender.findOne({
      where: {
        id: id,
      },
    })
      .then(async (gender) => {
        await gender.destroy();
        return res
          .status(200)
          .json({ message: "Registro eliminado con éxito" });
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
}

export async function getGenders(req, res) {
  try {
    let newGender = await Gender.findAll()
      .then((genders) => {
        return res.json(genders);
      })
      .catch((error) => {
        // Manejar el error
        console.log(error);
        return res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateGender(req, res) {
  try {
    const { id } = req.query;
    const updateInfo = req.body;
    let newGender = await Gender.findOne({
      where: {
        id: id,
      },
    })
      .then(async(gender) => {
        if (!gender) {
          return res.status(404).json({ message: 'No se encontró el registro de Género solicitado' });
        }
        await gender.update(updateInfo);
        return res.json(gender);
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
}
