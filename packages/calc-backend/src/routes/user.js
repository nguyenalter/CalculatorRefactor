import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware";
import * as userController from "../controllers/user";

router.post("/signup", async (req, res) => {
  // sign up route
  await userController.signUp(req, res);
});

router.post("/signin", async (req, res) => {
  // sign in route
  await userController.signIn(req, res);
});

router.get("/auth", verifyToken, async (req, res) => {
  // validate token route
  await userController.sendDataFromValidToken(req, res);
});

router.put("/auth", verifyToken, async (req, res) => {
  // add new history route
  await userController.appendToHistory(req, res);
});

router.patch("/auth", verifyToken, async (req, res) => {
  // delete a record in history
  await userController.deleteOneRecord(req, res);
});

router.delete("/auth", verifyToken, async (req, res) => {
  // delete all record of a user
  await userController.deleteAllRecord(req, res);
});

// router.get("/:id/", verifyToken, async (req, res) => {
//   // TODO - using this template for query history of a signed in user.
//   // TODO - create a feature for private/public history (later).
// });

export default router;
