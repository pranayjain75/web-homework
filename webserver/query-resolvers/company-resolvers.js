const { packageModel } = require('./utils.js')
const { CompanyModel } = require('../data-models/Company')


async function find(criteria) {
    const query = Object.keys(criteria).length
        ? CompanyModel.find(criteria)
        : CompanyModel.find()

    const companies = await query.exec()
    return packageModel(companies)
}


async function findOne(id) {
    const query = CompanyModel.findById(id)
    const company = await query.exec()
    return packageModel(company)[0] || null
}

async function searchCompanyByName(str) {
    const companies = await CompanyModel.fuzzySearch(str).exec();
    return packageModel(companies)
}

async function updateAvailalableCredit(company_id, amount) {
    const company = await CompanyModel.findById(company_id).exec()
    if (company.available_credit >= amount) {
        company.available_credit -= amount
        company.save()
    }
    else {
        throw new Error();
    }
}


module.exports = {
    find,
    findOne,
    searchCompanyByName,
    updateAvailalableCredit
}