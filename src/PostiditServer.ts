import * as cors from "cors";
import * as express from "express";
import { Application, Response, Request, Errback, NextFunction } from "express";
import logRequest from "./middlewares/logRequest";
import BaseController from "./interfaces/BaseController";
import TMiddleware from "types/TMiddleware";

/**
 * The REST API Express server.
 */
class PostiditServer {
  /**
   * The Express application for this server.
   */
  private readonly application: Application;

  /**
   * The base path for this server.
   */
  private readonly basePath: string;

  /**
   * Constructor for the PostiditServer.
   * @param {string} basePath The base path for this server (default: "/api")
   */
  constructor(basePath: string = "/api") {
    this.basePath = basePath;

    this.application = express();
  }

  /**
   * Add a middleware to the server's routing.
   * @param {TMiddleware} middleware The middleware to add
   * @return {PostiditServer} The server instance
   */
  public addMiddleware(middleware: TMiddleware): PostiditServer {
    this.application.use(middleware);
    return this;
  }

  /**
   * Add a controller to the server's routing.
   * @param {BaseController} controller The controller to add
   * @return {PostiditServer} The server instance
   */
  public addController(controller: BaseController): PostiditServer {
    this.application.use(this.basePath, controller.initializeRouter());
    return this;
  }

  /**
   * Start listening for requests on the specified port.
   * @param {number} port The port to listen on
   */
  public listen(port: number): void {
    this.application.use(async (_: Request, res: Response) => {
      return res.status(400).json({ message: "Not found" });
    });

    this.application.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

export default PostiditServer;
