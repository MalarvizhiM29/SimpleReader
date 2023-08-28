import express from "express";
import { router as authRoutes } from "./routes/auth";
import subsRoutes from "./routes/subs";
import MyPostRoutes from "./routes/Post";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(
    mongoURI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as Parameters<typeof mongoose.connect>[1]
  )

  .then(() => {
    console.log("Connected to DB");

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/subscription", MyPostRoutes);

    app.listen(5000, () => {
      console.log("Port is listening at 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
