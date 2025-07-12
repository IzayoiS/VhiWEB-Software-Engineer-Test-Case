const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route.js");
const vendorRoutes = require("./routes/vendor.route.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vendors", vendorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
