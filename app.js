import env from "dotenv";
env.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.routes.js";
import connectDb from "./Db/connectionDB.js";

const app = express();
const PORT = process.env.PORT;

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
  connectDb();
});
