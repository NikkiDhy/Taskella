//code to create a server
//express setup
//Sets up and exports the Express app without starting the server.

import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
// import { fileURLToPath } from "url"; // ADD THIS
// import path from "path"; // ADD THIS
// import dotenv from "dotenv"; // ADD THIS
// import connectDB from "./db/index.js"; // ADD THIS

// dotenv.config(); // ADD THIS
const app = express();

//const port = process.env.PORT || 4000;

// app.get("/", (req, res) => {
//   res.send("Hello Todo");
// });

// app.listen(port, () => {
//   console.log(`Example App listening on port: ${port}`);
// });

app.use(express.json());
app.use(cors());

//if request url is pi/v1/todo => then go to todoRoutes page
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/user", userRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

export default app;
