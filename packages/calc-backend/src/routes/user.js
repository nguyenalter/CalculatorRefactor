import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware";
import * as userController from "../controllers/user";

router.post("/signup", async (req, res) => {
  // TODO - Validate request before sign up
  // if (!req.body) return errorResponse(req, res, "Unauthorized access!", 401);
  // const requestData = req.body;
  // // Validate request data, must be in form of {username: ..., password: ...}
  // const fields = ["username", "password"];
  // const validateMessage = validateFields(requestData, fields);
  // if (validateMessage) return errorResponse(req, res, validateMessage, 400);

  await userController.signUp(req, res);
});

router.post("/signin", async (req, res) => {
  // TODO - Validate request before sign in
  await userController.signIn(req, res);
});

router.get("/auth", verifyToken, async (req, res) => {
  // TODO
  await userController.sendDataFromValidToken(req, res);
});

router.put("/auth", verifyToken, async (req, res) => {
  // TODO
  await userController.appendToHistory(req, res);
});

router.get("/:id/", verifyToken, async (req, res) => {
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
