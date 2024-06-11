import app from "./app.js";
import 'dotenv/config'
import { connectToDB } from "./db/connectToDB.js";

connectToDB()
.then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the Destination Finder");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  });
