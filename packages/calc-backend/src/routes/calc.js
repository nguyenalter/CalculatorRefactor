import express from "express";
import { calculate } from "../controllers/calculate";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  calculate(req, res);
});

export default router;
