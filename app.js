const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
