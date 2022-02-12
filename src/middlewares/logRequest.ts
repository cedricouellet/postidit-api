import { NextFunction, Request, Response } from "express";

/**
 * A middleware that logs incoming requests.
 * @param {Request} req The request
 * @param {Response} _ The response (unused)
 * @param {NextFunction} next The next function to call
 */
function logRequest(req: Request, _: Response, next: NextFunction) {
  console.log(req.method, req.url);
  next();
}

export default logRequest;
