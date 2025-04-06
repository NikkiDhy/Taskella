// main file  --  entry point
//Imports the app, connects to the database, and starts the server with app.listen().
import connectDB from "./db/index.js";
import app from "./app.js";
// import "dotenv/config";
import dotenv from "dotenv";
// import router from "./routes/todoRoutes.js";

// app.use(express.json());
// app.use(cors());

dotenv.config();
//if db connected > start listening on the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Example App listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed", err);
  });

// app.use("/todo", router);
