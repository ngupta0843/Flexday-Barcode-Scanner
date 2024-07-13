const express = require("express");
const app = express();
const apiRoutes = require("./routes/routes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const { Question, setupDatabase } = require("./database");
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(express.json());

setupDatabase();

app.use("/api", apiRoutes);

app.use("/", productRoutes);

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
