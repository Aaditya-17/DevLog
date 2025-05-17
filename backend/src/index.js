const express = require("express");
const cors = require("cors");
const apiroutes = require("./routes");
const { serverConfig, logger } = require("./config");
const app = express();

app.use(cors({}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", apiroutes);
app.listen(serverConfig.PORT, () => {
    console.log(`Server started on port ${serverConfig.PORT}`);
});
