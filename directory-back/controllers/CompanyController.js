const Company = require('@models/Companies');
const User = require('@models/Users');

class CompanyController {
  static async store (req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.auth;

      const company = new Company({ name, createdBy: id });
      const companyStored = await company.save();

      const user = await User.findById(id);

      if (!user.company) {
        user.company = companyStored._id;
        await user.save();
      }

      return res.status(201).send({ companyStored });
    } catch (e) {
      e.httpStatus = 500;
      return next(e);
    }
  }

  static async findCompaniesUser (req, res, next) {
    try {
      const { id } = req.params;
      const companyUser = await Company.findOne({ createdBy: id, isActive: true });
      return res.status(200).send({ companyUser });
    } catch (e) {
      return next(e);
    }
  }

  static async findUsersOfCompany (req, res, next) {
    try {
      const { id } = req.params;
      const usersCompany = await User.find({ company: id });

      res.status(200).send({ usersCompany });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CompanyController;
