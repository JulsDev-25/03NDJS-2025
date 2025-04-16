import mongoose from "mongoose";

mongoose

  .connect("mongodb://localhost:27017/db_pockemon")
  .then(() => console.log("Connected"))
  .catch((err) => console.error("connection error: ", err));
