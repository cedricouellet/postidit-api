/**
 * The error type for invalid post input.
 */
type TPostError = {
  title?: string;
  body?: string;
  user_id?: string;
};

export default TPostError;
