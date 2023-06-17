/**
 * @readonly
 * @enum {Number}
 * Enum for errors
 * Freezing the object makes it immutable,
 * that is, you can't add/remove properties or change their values.
 * This is essential to mock the behavior of enum which isn't natively supported by JS
 */
exports.postErrors = Object.freeze({
  MONGO_ERR: 0,
  NOT_AUTHOR: 1,
  INVALID_POST_KIND: 2,
  INVALID_OWNER: 3,
  SUBREDDIT_NOT_FOUND: 4,
  POST_NOT_FOUND: 5,
  NOT_EDITABLE: 7,
  FLAIR_NOT_FOUND: 8,
  NOT_AUTHOR_OR_MOD: 9,
  NOT_MOD: 10,
  OWNER_NOT_SUBREDDIT: 11,
  ACTION_ALREADY_DONE: 12,
  INVALID_PARENT_POST: 13,
});



exports.chatErrors = Object.freeze({
  MONGO_ERR: 0,
  NO_VALID_RESPONSE: 1
});





exports.userErrors = Object.freeze({
  MONGO_ERR: 0,
  USER_NOT_FOUND: 9,
  USER_ALREADY_EXISTS: 2,
  INCORRECT_PASSWORD: 3,
  EMAIL_ERROR: 5,
  INVALID_TOKEN: 6,
  INVALID_RESET_TOKEN: 7,
  ALREADY_MODERATOR: 10,
  MAXSOCIALLINKS: 8,
  INVALID_SOCIALID: 9,
  Not_MODERATOR: 20,
  MODERATOR: 21,
  ALREADY_BANED: 30,
  Not_BANED: 22,
  ALREADY_MUTED: 31,
  Not_MUTED: 32,
  ALREADY_APPROVED: 12,
  USER_IS_ALREADY_INVITED: 43,
  NOT_APPROVED: 41,
});

exports.mongoErrors = Object.freeze({
  NOT_FOUND: 90,
  VALIDATION: 1,
  INVALID_ID: 2,
  DUPLICATRE_KEY: 3,
  UNKOWN: 4,
});

exports.decorateError = (err) => {
  let msg = "",
    error = this.mongoErrors.UNKOWN;

  if (err.name === "CastError") {
    error = this.mongoErrors.INVALID_ID;
    msg = `Invalid ${err.path}`;
  } else if (err.code === 11000) {
    //Extracting the duplicate value from the error msg
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    error = this.mongoErrors.DUPLICATRE_KEY;
    msg = `Duplicate field value: ${value}`;
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => {
      if (el.name === "CastError") return el.path;
      return el.message;
    });
    error = this.mongoErrors.VALIDATION;
    msg = `Invalid data: ${errors.join(", ")}`;
  }

  return { error, msg };
};

exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    status: "fail",
    message: "Internal server error",
  });
};
