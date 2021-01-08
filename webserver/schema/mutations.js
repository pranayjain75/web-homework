const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User');
const TransactionType = require('./transaction-type')
const UserType = require('./user-type');
const CompanyType = require('./company-type');
const Users = require('../query-resolvers/user-resolvers.js')
const Companies = require('../query-resolvers/company-resolvers.js')
const { CompanyModel } = require('../data-models/Company');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      async resolve(parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        const user = await Users.findOne(user_id)
        Companies.updateAvailalableCredit(user.company_id, amount)
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    addUser: {
      type: UserType,
      args: {
        dob: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        company_id: { type: GraphQLString }
      },
      resolve(parentValue, { dob, firstName, lastName, company_id }) {
        return (new UserModel({ dob, firstName, lastName, company_id })).save()
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        credit_line: { type: GraphQLFloat },
      },
      resolve(parentValue, { name, credit_line }) {
        return (new CompanyModel({ name, credit_line, available_credit: credit_line })).save()
      }
    }
  }
})

module.exports = mutation

