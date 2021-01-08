/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const UserSchema = require(path.join('..', 'data-models', 'User')) // eslint-disable-line no-unused-vars
const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))

const Companies = require('./../query-resolvers/company-resolvers')
const Transactions = require('./../query-resolvers/transaction-resolvers')

const TransactionType = require('./transaction-type')
const CompanyType = require('./company-type')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    company_id: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parentValue) {
        return Companies.findOne(parentValue.company_id)
      }
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parentValue) {
        return Transactions.find({ user_id: parentValue.id })
      }
    }
  })
})

module.exports = UserType
