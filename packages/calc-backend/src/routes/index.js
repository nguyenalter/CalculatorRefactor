import userRoute from "./user";
import calcRoute from "./calc";

import { errorResponse } from "../utils/response";

export default function routeManager(app) {
  // List of handled routes.
  app.use("/user", userRoute);
  app.use("/calc", calcRoute);

  // Handle invalid url (404 status) - must be the last one.
  app.use((req, res, next) => errorResponse(req, res, "Invalid url", 404));
  return;
}
