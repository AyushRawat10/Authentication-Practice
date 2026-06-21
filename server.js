import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/database/db.database.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port : https://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error : ", error);
    process.exit(1);
  });
