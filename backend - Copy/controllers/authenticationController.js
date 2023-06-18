const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
var validator = require("email-validator");
const { trusted } = require("mongoose");
const { userErrors } = require("../error_handling/errors");
/**
 * AuthenticationController Class which handles authentication and authorization of user in backend
 */
class AuthenticationController {
  /**
   * Constructor
   * Depends on user services object
   * @param {object} UserService - user service object
   */
  constructor({ UserService }) {
    this.UserServices = UserService; // can be mocked in unit testing
  }

  errorResponse = (error, serviceMessage) => {
    let msg, stat;
    switch (error) {
      case userErrors.MONGO_ERR:
        msg = "Invalid parent, couldn't create user";
        stat = 400;
        break;
      case userErrors.USER_NOT_FOUND:
        msg = "User Not Found";
        stat = 404;
        break;
      case userErrors.USER_ALREADY_EXISTS:
        msg = "User Already Exists";
        stat = 400;
        break;
      case userErrors.INCORRECT_PASSWORD:
        msg = serviceMessage;
        stat = 400;
        break;
      case userErrors.EMAIL_ERROR:
        msg = serviceMessage;
        stat = 500;
        break;
      case userErrors.INVALID_TOKEN:
        msg = serviceMessage;
        stat = 400;
        break;
      case userErrors.INVALID_RESET_TOKEN:
        msg = serviceMessage;
        stat = 401;
        break;
    }
    return { msg, stat };
  };
  /**
   * @property {Function} createCookie create cookie to store token and send to user
   * @param {object} res - response to client
   * @param {string} token - user token to put in cookie
   * @param {number} statusCode - status code of respones
   * @returns void
   */
  createCookie = (res, token, statusCode) => {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      sameSite: "None",
      httpOnly: false,
      secure: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    if (process.env.NODE_ENV === "production") cookieOptions.httpOnly = true;
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
      status: "success",
      token,
      // expiresIn: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
    });
  };
  /**
   * @property {Function} signUp signup new user in database
   * @param {object} req - request object sent by client
   * @param {object} res - response to client
   * @param {Function} next -  function to execute next middleware
   * @returns void
   */
  signUp = async (req, res, next) => {
    const email = req.body.email;
    // const userName = req.body.userName;
    const password = req.body.password;
    if (!email || !password) {
      // bad request
      res.status(400).json({
        status: "fail",
        errorMessage: "Provide  email and password",
        errorType: 0,
      });
    } else {
      const passwordStrength =
        this.UserServices.checkPasswordStrength(password);
      if (passwordStrength === "Too weak" || passwordStrength === "Weak") {
        res.status(400).json({
          status: "fail",
          errorMessage: passwordStrength + " password",
          errorType: 1,
        });
      } else {
        const user = await this.UserServices.signUp(email, password);
        if (user.success === true) {


          this.createCookie(res, user.token, 201);
        } else {
          const response = this.errorResponse(user.error, user.msg);
          res.status(response.stat).json({
            status: "fail",
            errorMessage: response.msg,
            errorType: 2,
          });
        }
      }
    }
  };
  /**
   * @property {Function} logIn autheticate user by send cookie token to him
   * @param {object} req - request object sent by client
   * @param {object} res - response to client
   * @param {Function} next -  function to execute next middleware
   * @returns void
   */
  logIn = async (req, res, next) => {

    if (!req.body.email || !req.body.password) {
      // bad request
      res.status(400).json({
        status: "fail",
        errorMessage: "Provide email and password",
      });
    } else {
      // const userName = req.body.userName;
      const email = req.body.email;
      const password = req.body.password;
      // console.log(email);
      // console.log(password);
      const user = await this.UserServices.logIn(email, password);
      // console.log("ouuuuuuuuuuuuuut");
      if (user.success === true) {
        //res.status(201).json(response.body);
        this.createCookie(res, user.token, 200);
      } else {
        const response = this.errorResponse(user.error, user.msg);
        res.status(response.stat).json({
          status: "fail",
          errorMessage: response.msg,
        });
      }
    }
  };
  /**
   * @property {Function} logOut remove cookie of user
   * @param {object} req - request object sent by client
   * @param {object} res - response to client
   * @returns void
   */
  logOut = (req, res) => {
    //res.clearCookie("jwt");
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      sameSite: "None",
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    res.status(200).json({
      status: "success",
    });
  };


  /**
   * @property {Function} authorize check cookie sent by client inorder to validate user logged in
   * @param {object} req - request object sent by client
   * @param {object} res - response to client
   * @param {Function} next -  function to execute next middleware
   * @returns void
   */
  authorize = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
    }
    if (!token) {
      res.status(401).json({
        status: "fail",
        errorMessage: "Unauthorized",
      });
    } else {
      try {
        const decoded = await this.UserServices.decodeToken(token);
        const userId = decoded.id;
        // const time = decoded.iat;
        const user = await this.UserServices.getUser(userId);
        if (user.success === false) {
          console.log(user);
          res.status(404).json({
            status: "fail",
            errorMessage: "User not found",
          });
        } else {

          req.user = user.data;
          next();

        }
      } catch (err) {
        res.status(401).json({
          status: "fail",
          errorMessage: "Unauthorized",
        });
      }
    }
  };


  /**
   * @property {Function} googleAuth google authentication signup or login
   * @param {object} req - request object sent by client
   * @param {object} res - response to client
   * @param {Function} next -  function to execute next middleware
   */
  googleAuth = async (req, res, next) => {
    const oAuth2Client = new OAuth2Client();
    if (!req.body.tokenId) {
      res.status(400).json({
        status: "fail",
        errorMessage: "provide token",
      });
    } else {
      try {
        const token = req.body.tokenId;
        const key = await oAuth2Client.verifyIdToken({
          idToken: token,
          requiredAudience: process.env.GOOGLE_APP_ID,
        });
        const payload = key.getPayload();
        const email = payload["email"];
        let user = await this.UserServices.getUserByEmail(email);
        if (user.success === false) {
          // user not found, signup new user
          // const userName = "user";
          const password = this.UserServices.generateRandomPassword();
          let user = await this.UserServices.signUp(email, password);
          if (user.success === true) {
            this.createCookie(res, user.token, 201);
          } else {
            const response = this.errorResponse(user.error, user.msg);
            res.status(response.stat).json({
              status: "fail",
              errorMessage: response.msg,
            });
          }
          //}
        } else {
          const token = await this.UserServices.createToken(user.data._id);
          this.createCookie(res, token, 200);
        }
      } catch (error) {
        res.status(400).json({
          status: "fail",
          errorMessage: "provide valid token",
        });
      }
    }
  };

  verifyEmail = async (req, res, next) => {
    const verificationToken = req.params.token;
    let result = await this.UserServices.verifyEmailToken(verificationToken);
    if (result.success === true) {
      res.status(204).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        errorMessage: "Token Invalid or Has Expired",
      });
    }
  };

  checkResetTokentime = async (req, res, next) => {
    const resetToken = req.params.token;
    let result = await this.UserServices.checkResetTokenTime(resetToken);
    if (result.success === true) {
      res.status(204).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        errorMessage: "Token is invalid or has expired",
      });
    }
  };

  checkAuthorize = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
    }
    if (!token) {
      req.isAuthorized = false;
      next();
    } else {
      const decoded = await this.UserServices.decodeToken(token);
      const userId = decoded.id;
      const time = decoded.iat;
      const user = await this.UserServices.getUser(userId);
      if (user.success === false) {
        req.isAuthorized = false;
        next();
      } else {
        if (user.data.changedPasswordAfter(time)) {
          req.isAuthorized = false;
          next();
        } else {
          req.user = user.data;
          req.isAuthorized = true;
          next();
        }
      }
    }
  };

}

module.exports = AuthenticationController;
