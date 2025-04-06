//code to create a server
//express setup
//Sets up and exports the Express app without starting the server.

import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

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

export default app;
