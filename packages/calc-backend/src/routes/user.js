import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/token";
import { checkHeader } from "../middleware";
import * as userController from "../controllers/user";
import bcrypt from "bcrypt";

router.post("/auth", (req, res) => {
  // TODO - Sign up
  // if (!req.body) return errorResponse(req, res, "Unauthorized access!", 401);
  // const requestData = req.body;
  // // Validate request data, must be in form of {username: ..., password: ...}
  // const fields = ["username", "password"];
  // const validateMessage = validateFields(requestData, fields);
  // if (validateMessage) return errorResponse(req, res, validateMessage, 400);

  userController.signUp(req, res);
});

router.get("/auth", async (req, res) => {
  // TODO - Sign in
  const requestData = req.body;
  // TODO - Compare raw password vs hashed one in DB
  let hash = "$2b$10$wm4lDkj9mRAW3/xnxsGTn.Afz1XL.iiBlID/KZEcaBV8zXO6ZZAi.";
  const isMatch = await bcrypt.compare(requestData.password, hash);
  res.json({ isMatch: isMatch });
  // TODO
});

router.get("/:id/", checkHeader, async (req, res) => {
  // TODO - using this template for query history of a signed in user.
  // TODO - create a feature for private/public history (later).
  console.log("Request id: " + req.params.id);
  const history = req.params.id;
  const token = req.headers.authorization.substring(7);
  const decoded = await verifyToken(token, process.env.JWT_SECRETKEY);
  // Decode successfully, send data back to client.
  if (decoded) res.json({ decoded: decoded, historyId: history });
  // Check for wrong signature or error while decoding.
  else res.json({ error: "Unauthorized access!" });
});

export default router;
