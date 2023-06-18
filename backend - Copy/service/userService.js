const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { passwordStrength } = require("check-password-strength");
const generator = require("generate-password");
const { userErrors } = require("../error_handling/errors");

const { promisify } = require("util");

/**
 * User Service Class for handleing user model and services
 */
class UserService {
  /**
   * User Service Constructor
   * Depend on User,UserRepository Class which deals with database and email Services
   * @param {object} User - User Data Model
   * @param {object} UserRepository - User Repository Object for Deal with mongodb
   * @param {object} emailServices - Email Service Object for send emails to users
   */
  constructor({
    /*Repository*/
    UserRepository,
    Email
  }) {
    
    this.userRepository = UserRepository; // can be mocked in unit testing
    this.emailServices = Email;
   
  }

  generateRandomPassword() {
    var password = generator.generate({
      length: 10,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
    // console.log(password);
    return password;
  }
  checkPasswordStrength(password) {
    return passwordStrength(password).value;
  }
 
  /**
   * @property {Function} createToken create user token
   * @param {string} id - User Id to be stored in token
   * @returns {string} - User Token
   */
  createToken(id) {
   
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
  /**
   * @property {Function} signUp sign up user in backend
   * add user in database if not exists before
   * or reject services if user already exists.
   * @param {object} email - user email (unique)
   * @param {string} userName - user user name (unique)
   * @param {string} password - user password
   * @returns {object} - response of signup contain status of services and body to send to client
   */
  async signUp(email,  password) {
    const userData = {
      email: email,
      
      password: password,
    };
    //this.checkPasswordStrength(password);
    let user = await this.userRepository.createOne(userData);
    if (user.success === false) {
      // user with this email or username is exists
      const response = {
        success: false,
        error: userErrors.USER_ALREADY_EXISTS,
        msg: user.msg,
      };
      return response;
    } else {
      const token = this.createToken(user.doc._id);
      const response = {
        success: true,
        token: token,
      };
      return response;
    }
  }
  /**
   * @property {Function} logIn login user in backend
   * check if user is already in database and add correct pasword to authenticate user and send token
   * or reject services if not found or incorrect password entered
   * @param {string} userName - user user name (unique)
   * @param {string} password - user password
   * @returns {object} - response of login contain status of services and body to send to client
   */
  async logIn(email, password) {
    let user = await this.userRepository.findByEmail(email);
    console.log(user);
    if (user.success === false) {
      const response = {
        success: false,
        error: userErrors.USER_NOT_FOUND,
        msg: user.msg,
        // msg:"invaild userName or password",
      };
      return response;
    } else {
      if (await user.doc.checkPassword(password, user.doc.password)) {
        const token = this.createToken(user.doc._id);
        const response = {
          success: true,
          token: token,
        };
        return response;
      } else {
        const response = {
          success: false,
          error: userErrors.INCORRECT_PASSWORD,
          msg: "Incorrect Password",
          // msg:"invaild userName or password",
        };
        return response;
      }
    }
  }
  
 
  async sendVerificationToken(user) {
    const verificationToken = user.createVerificationToken();
    user.emailVerified = false;
    this.replaceProfile(user);
    await user.save({ validateBeforeSave: false });

    // front Domain verification page
    const verifyURL = `${process.env.FRONTDOMAIN}/verification/${verificationToken}`;
    try {
      await this.emailServices.sendVerificationMail(user, verifyURL);
      const response = {
        success: true,
      };
      return response;
    } catch (error) {
      const response = {
        success: false,
        error: userErrors.EMAIL_ERROR,
        msg: "Cannot Send Emails at that moment ,try again later",
      };
      return response;
    }
  }
 
  async verifyEmailToken(verificationToken) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    let user = await this.userRepository.findByVerificationToken(hashedToken);
    if (user.success === false) {
      // invalid token or time passed
      const response = {
        success: false,
        error: userErrors.INVALID_RESET_TOKEN,
        msg: "Token Invalid or Has Expired",
      };
      return response;
    } else {
      user.doc.verificationToken = undefined;
      user.doc.verificationTokenExpires = undefined;
      user.doc.emailVerified = true;
      // this.replaceProfile(user.doc);
      await user.doc.save();
      const response = {
        success: true,
      };
      return response;
    }
  }

  /**
   * @property {Function} decodeToken get information out from token
   * @param {string} token - user token
   * @returns {object} - decoded object of token which contains id of user and secret key to check if token is valid
   */
  async decodeToken(token) {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    return decoded;
  }

  /**
   * @property {Function} getUser get user information from database by user id
   * should be generic
   * @param {*} id - user id
   * @returns {object} - user model
   */
  async getUser(id) {
    let user = await this.userRepository.findById(id, "", "");
    if (user.success === true) {
      const response = {
        success: true,
        data: user.doc,
      };
      return response;
    } else {
      const response = {
        success: false,
        error: userErrors.USER_NOT_FOUND,
        msg: "User Not Found",
      };
      return response;
    }
  }


  /**
   * @property {Function} getUserByEmail get user information from database by email
   * @param {string} email - user email
   * @returns {object} - user model
   */
  async getUserByEmail(email) {
    let user = await this.userRepository.findByEmail(email);
    if (user.success === true) {
      const response = {
        success: true,
        data: user.doc,
      };
      return response;
    } else {
      const response = {
        success: false,
        error: userErrors.USER_NOT_FOUND,
        msg: "User Not Found",
      };
      return response;
    }
  }
 

  /**
   * @property {Function} filterObj filter data to prevent changing of nonchangeable in database like password
   * @param {object} obj - object to filterd by allowedFields
   * @param  {...any} allowedFields - fields which will be kept if found in new object
   * @returns {object} - filtered object
   */
  filterObj(obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  }

 


  async checkPassword(password, email) {
    let user = await this.userRepository.findByEmail(email);
    return await user.doc.checkPassword(password, user.doc.password);
  }
 
  async checkResetTokenTime(resetToken) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    let user = await this.userRepository.findByResetPassword(hashedToken);
    if (user.success === false) {
      // invalid token or time passed
      const response = {
        success: false,
        error: userErrors.INVALID_RESET_TOKEN,
        msg: "Token Invalid or Has Expired",
      };
      return response;
    } else {
      const response = {
        success: true,
        msg: "valid token",
      };
      return response;
    }
  }
 
 
  
}

module.exports = UserService;
