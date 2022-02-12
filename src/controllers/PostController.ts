import { Request, Response, Router } from "express";
import PostService from "../services/PostService";
import TPostInput from "../types/TPostInput";
import BaseController from "../interfaces/BaseController";
import { toNumber, isNullOrUndefined } from "../utils/helpers";
import TPostError from "types/TPostError";

/**
 * The controller for the post resource.
 *
 * - `GET /posts` - Get all posts.
 * - `GET /posts/:id` - Get a post by its id
 * - `POST /posts` - Create a new post
 * - `DELETE /posts/:id` - Delete a post
 */
class PostController extends BaseController {
  /**
   * Constructor for the PostController.
   */
  constructor() {
    super("/posts");
  }

  /**
   * @inheritdoc
   */
  public initializeRouter(): Router {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.post(this.path, this.create);
    this.router.delete(`${this.path}/:id`, this.delete);
    return this.router;
  }

  /**
   * Get a post by its id.
   * @param {Request} req The request
   * @param {Response} res The response
   * @return {Promise<Response>} The response
   */
  private async getById(req: Request, res: Response): Promise<Response> {
    const id = toNumber(req.params.id);

    if (isNullOrUndefined(id)) {
      return res.status(422).json({
        message: "Invalid post id",
      });
    }

    try {
      const post = await PostService.getById(id!);

      if (isNullOrUndefined(post)) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      return res.status(200).json({ data: post });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Get all posts.
   * @param {Request} req The request
   * @param {Response} res The response
   * @return {Promise<Response>} The response
   */
  private async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const posts = await PostService.getAll();
      return res.status(200).json({ data: posts });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Create a post.
   * @param {Request} req The request
   * @param {Response} res The response
   * @return {Promise<Response>} The response
   */
  private async create(req: Request, res: Response): Promise<Response> {
    const createInput: TPostInput = req.body;

    const errors: TPostError = {};

    if (isNullOrUndefined(createInput.title)) {
      errors.title = "Title is required";
    }

    if (isNullOrUndefined(createInput.body)) {
      errors.body = "Body is required";
    }

    if (isNullOrUndefined(createInput.user_id)) {
      errors.user_id = "User id is required";
    } else if (!Number.isInteger(createInput.user_id)) {
      errors.user_id = "User id must be an integer";
    }

    if (errors.body || errors.title || errors.user_id) {
      return res.status(400).json({
        message: "Invalid input",
        errors,
      });
    }

    try {
      // TODO Check if user id exists

      const createdPost = await PostService.create(createInput);
      if (isNullOrUndefined(createdPost)) {
        return res.status(409).json({
          message: "Could not create post",
        });
      }

      return res.status(201).json({
        message: "Post created",
        data: createdPost,
      });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Delete a post.
   * @param {Request} req The request
   * @param {Response} res The response
   * @return {Promise<Response>} The response
   */
  private async delete(req: Request, res: Response): Promise<Response> {
    const id = toNumber(req.params.id);

    if (isNullOrUndefined(id)) {
      return res.status(422).json({
        message: "Invalid post id",
      });
    }

    try {
      const postWithId = await PostService.getById(id!);
      if (isNullOrUndefined(postWithId)) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      const deletedPost = await PostService.delete(id!);
      if (isNullOrUndefined(deletedPost)) {
        return res.status(409).json({
          message: "Could not delete post",
        });
      }

      return res.status(200).json({
        message: "Post deleted",
        data: deletedPost,
      });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default PostController;
