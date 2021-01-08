const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User');
const { packageModel } = require('./utils.js')
// const { CompanyModel } = require('../data-models/Company')


async function find(criteria) {
    const query = Object.keys(criteria).length
        ? UserModel.find(criteria)
        : UserModel.find()

    const users = await query.exec()
    return packageModel(users)
}


async function findOne(id) {
    const query = UserModel.findById(id)
    const user = await query.exec()
    return packageModel(user)[0] || null
}

async function searchUser(str) {
    const users = await UserModel.fuzzySearch(str).exec();
    return packageModel(users)
}


module.exports = {
    find,
    findOne,
    searchUser
}