const Company = require('@models/companies');

class CompanyController {
  static async store (req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.auth;

      const company = new Company({ name, createdBy: id });
      const companyStored = await company.save();

      return res.status(201).send({ companyStored });
    } catch (e) {
      e.httpStatus = 500;
      return next(e);
    }
  }

  static async findCompaniesUser (req, res, next) {
    try {
      const { id } = req.params;
      const companiesUser = await Company.find({ createdBy: id, isActive: true });
      return res.status(200).send({ companiesUser });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = CompanyController;
