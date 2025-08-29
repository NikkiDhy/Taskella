import express from "express";
import { addUser, updateUser } from "../controllers/userController.js";

const router = express.Router();
router.route("/add").post(addUser);
router.route("/update").post(updateUser);

export default router;
