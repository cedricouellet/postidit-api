import { query, clean } from "../database/mariadb";

import TPostInput from "../types/TPostInput";
import TPostOutput from "../types/TPostOutput";

const TABLE_NAME: string = "posts";

/**
 * The service for the Post entity in the database.
 *
 * - Get a post by its id.
 * - Get all posts.
 * - Add a new post.
 * - Delete a post by its id.
 */
class PostService {
  /**
   * Get all posts for a user.
   * @param {number} userId The user for which to get posts
   * @return {Promise<TPostOutputp[]>} The posts for the user
   */
  public static async getAllByUserId(userId: number): Promise<TPostOutput[]> {
    const queryResult = await query(
      `SELECT * FROM ${TABLE_NAME}
       WHERE user_id = ?`,
      [userId]
    );

    const results = clean(queryResult);
    return PostService.fromResultArray(results);
  }

  /**
   * Get all posts.
   * @return {Promise<TPostOutput[]} All posts.
   */
  public static async getAll(): Promise<TPostOutput[]> {
    const queryResult = await query(`SELECT * FROM ${TABLE_NAME}`);

    const results = clean(queryResult);
    return PostService.fromResultArray(results);
  }

  /**
   * Get a post by id.
   * @param {number} id The id of the post to get
   * @return {Promise<TPostOutput | null} The post with the given id or null if not found.
   */
  public static async getById(id: number): Promise<TPostOutput | null> {
    const queryResult = await query(
      `SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
      [id]
    );

    const result = clean(queryResult)?.[0];
    return PostService.fromResult(result);
  }

  /**
   * Create a new post.
   * @param {TPostInput} item The post to create
   * @return {Promise<TPostOutput | null>} The created post or null.
   */
  public static async create(item: TPostInput): Promise<TPostOutput | null> {
    const queryResult = await query(
      `INSERT INTO ${TABLE_NAME}(title, body, user_id) 
       VALUES(?, ?, ?) RETURNING *`,
      [item.title, item.body, item.user_id]
    );

    const result = clean(queryResult)?.[0];
    return PostService.fromResult(result);
  }

  /**
   * Delete a post.
   * @param {number} id The id of the post to delete
   * @return {Promise<TPostOutput | null>} The deleted post or null.
   */
  public static async delete(id: number): Promise<TPostOutput | null> {
    const queryResult = await query(
      `DELETE FROM ${TABLE_NAME} 
        WHERE id = ?
        RETURNING *`,
      [id]
    );

    const result = clean(queryResult)?.[0];
    return PostService.fromResult(result);
  }

  /**
   * Build a post from a query result.
   * @param {any} result The query result
   * @return {TPostOutput | null} The post or null.
   */
  private static fromResult(result: any): TPostOutput | null {
    if (!result) {
      return null;
    }

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      user_id: result.user_id,
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at),
    };
  }

  /**
   * Build an array of posts from a query result.
   * @param {any[]} results The query results
   * @return {TPostOutput[]} The posts or an empty array.
   */
  private static fromResultArray(results: any[]): TPostOutput[] {
    const posts: TPostOutput[] = [];
    results.forEach((result: any) => {
      const post: TPostOutput | null = PostService.fromResult(result);
      if (post) {
        posts.push(post);
      }
    });
    return posts;
  }
}

export default PostService;
