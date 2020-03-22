const express = require("express");
const cors = require("cors");
const hubsRouter = require("../data/routes");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "Son of Hal! Always listening!" });
});

server.use("/api/users", hubsRouter);

module.exports = server;
