import express from "express"
import { questionSearch } from "../controllers/Question.controller.js";

const router = express.Router()

router.get("/question", questionSearch);

export default router;