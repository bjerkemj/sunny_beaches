const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(cors());

// Import your route handlers
const combinedResultRouter = require("./routes/combinedResult");
const combinedResultMainRouter = require("./routes/combinedResultMain");
const counter = require("./routes/counter");

// Middleware
app.use(express.json());

// Use the Helmet middleware
app.use(helmet());

// Mount the combined result route handler
app.use("/combined", combinedResultRouter);
app.use("/combined/main", combinedResultMainRouter);
app.use("/counter", counter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
