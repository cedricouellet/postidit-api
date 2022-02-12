import { Router } from "express";

/**
 * The abstract base class for all controllers.
 */
abstract class BaseController {
  /**
   * The base path for this controller.
   */
  protected readonly path: string;

  /**
   * The router for this controller.
   */
  protected readonly router: Router;

  /**
   * Constructor for the base controller.
   * @param {string} path The base path for this controller.
   */
  protected constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initializeRouter();
  }

  /**
   * Initialize the router.
   * @return {Router} The router for this controller.
   */
  public abstract initializeRouter(): Router;
}

export default BaseController;
