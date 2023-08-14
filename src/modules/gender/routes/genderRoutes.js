import { Router } from "express";
import {
  createGender,
  getGenderByIdUser,
  deleteGender,
  getGenders
} from "../controllers/genderController.js";

const router = Router();

// Routes
router.post("/gender", createGender);
router.get("/gender", getGenderByIdUser);
router.delete("/gender",deleteGender)
router.get("/genders",getGenders)


export default router;
