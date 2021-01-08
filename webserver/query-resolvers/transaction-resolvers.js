const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')
const Users = require('./user-resolvers.js')


async function find(criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}


async function findOne(id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function filter(min, max) {
  const query = TransactionModel.find({ "amount": { $gt: min, $lt: max } });
  const transactions = await query.exec()
  console.log(packageModel(transactions))
  return packageModel(transactions)
}

module.exports = {
  find,
  findOne,
  filter,

}