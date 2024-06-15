import express from "express";
import { homePage } from "../controllers/homeController.js";

const router = express.Router();

// load home page
router.get('/', homePage);

export default router; 