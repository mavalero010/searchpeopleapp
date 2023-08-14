import { Router } from "express";
import {
  createUser,
  getNearPeople,
  getUserById,
  deleteUserById,
  getAllUsers,
  uploadImage
} from "../controllers/userController.js";
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

// Routes
router.post("/user", createUser);
router.post("/user/upload-image", upload.single('profile_image'),async(req,res)=>{
  const file = req.file
  uploadImage(req,res,file)}
  )

router.get("/users/near",getNearPeople)
router.get("/user",getUserById)
router.get("/users",getAllUsers)

router.delete("/user",deleteUserById)

export default router;
