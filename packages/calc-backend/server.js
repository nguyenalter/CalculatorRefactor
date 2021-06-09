import app from "./app";

const port = process.env.PORT_DEV;

app.listen(port, () => {
  console.log("App running on port: " + port);
});
