const express = require("express");
const dbConnection = require("./controllers/dbConnection");
const dotenv = require("dotenv");
const config = dotenv.config();
const app = express();
const port = 5000 || process.env.PORT

dbConnection()

app.use(express.json());
//app.use("/api/admin",require("./routes/userRoutes"))
// app.use("/api/product",require("./routes/productRoutes"))

app.listen(port,() => {
    console.log(`port is runnign on ${port}`);
})