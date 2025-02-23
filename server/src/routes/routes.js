import express from "express";
import { submitForm , fetchEntries,  deleteEntry, fetchEntry, updateEntry} from "../controllers/userController.js";

const router = express.Router();

router.post("/submit", submitForm)
    .get("/blogs", fetchEntries)   
    .get("/blogs/:id", fetchEntry)
    .put("/blogs/:id", updateEntry)
    .delete("/blogs/:id", deleteEntry);

export default router;
