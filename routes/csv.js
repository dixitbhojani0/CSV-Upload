import express from "express";
import { deleteCSV, displayCSV, uploadFile } from "../controllers/csvController.js";
import flieUpload from "../middlewares/flieUpload.js";

const router = express.Router();

//Upload CSV
router.post('/upload', flieUpload.single("csvUpload"), uploadFile);

// Delete CSV File
router.get("/delete/:id", deleteCSV);

// view CSV data in table format
router.get('/:id', displayCSV);

export default router;