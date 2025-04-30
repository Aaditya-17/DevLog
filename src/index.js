const express = require("express");

const apiroutes = require("./routes");
const { serverConfig, logger } = require("./config");
const app = express();

app.use("/api", apiroutes);
app.listen(serverConfig.PORT, () => {
    console.log(`Server started on port ${serverConfig.PORT}`);
});
