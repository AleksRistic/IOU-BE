const http = require("http");
const app = require("./app");
const helmet = require("helmet");
const compression = require("compression");
const logger = require("./util/log");

//Constants
const PORT = 3001;
const HOST = "192.168.1.70"; // TODO: Change to localhost when uploading to GitHub
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";

app.use(helmet());
app.use(compression());

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});

const server = http.createServer(app);
server.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);

module.exports = server;
