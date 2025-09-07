import express from "express";
import {
  addUser,
  LoginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/add").post(addUser);
router.route("/update").post(updateUser);
router.route("/login").post(LoginUser);

export default router;
