const Repository = require("./repository");
const { mongoErrors, decorateError } = require("../error_handling/errors");

class UserRepository extends Repository {
  constructor({ User }) {
    super(User);
  }

  //can be further extended to allow select and populate
  async findById(id,select,pop) {
    try {
      // console.log("beforeeeeeeeeeeeeeeeeeeeeeeeee");
      // console.log(select);
      //  console.log(pop);
      let query = this.model.findById(id, { isDeleted: false });
      if (select) query = query.select(select);
      if (pop) query = query.populate(pop);
      const doc = await query;
      console.log("doc",doc);
      if (!doc) return { success: false, error: mongoErrors.NOT_FOUND };
      // console.log(doc);
      return { success: true, doc: doc };

      //most probably you won't need error handling in this function but just to be on the safe side
    } catch (err) {
      console.log(err);
      return { success: false, ...decorateError(err) };
    }
  }
  async findByUserName(userName, select, pop) {
    let query = this.model.findOne({ userName: userName, isDeleted: false });
    if (select) query = query.select(select);
    if (pop) query = query.populate(pop);
    const user = await query;
    console.log(user);
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }
  async findByName(userName) {
    let query = this.model.findOne({ userName: userName });
    const user = await query;
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    console.log(user);
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }
  async findByEmail(email) {
    let query = this.model.findOne({ email: email, isDeleted: false });
    const user = await query;
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }
  async findByEmailAndUserName(userName, email) {
    let query = this.model.findOne({
      email: email,
      userName: userName,
      isDeleted: false,
    });
    const user = await query;
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }
  async findByResetPassword(passwordResetToken) {
    let query = this.model.findOne({
      passwordResetToken: passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    const user = await query;
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }

  async findByVerificationToken(verificationToken) {
    let query = this.model.findOne({
      verificationToken: verificationToken,
      verificationTokenExpires: { $gt: Date.now() },
    });
    const user = await query;
    if (!user) return { success: false, error: mongoErrors.NOT_FOUND };
    return { success: true, doc: user };
  }





}
module.exports = UserRepository;
