require("dotenv").config();

import express = require("express");
import cors = require("cors");

import PostController from "./controllers/PostController";
import PostiditServer from "./PostiditServer";
import logRequest from "./middlewares/logRequest";
import { toNumber } from "./utils/helpers";

// Get port from .env config
const PORT = toNumber(process.env.PORT) || 3000;

// Server creation
const server = new PostiditServer("/api");

// Add server middlewares
server
  .addMiddleware(express.json())
  .addMiddleware(cors())
  .addMiddleware(logRequest);

// Add server controllers
server.addController(new PostController());

// Start listening
server.listen(PORT);
