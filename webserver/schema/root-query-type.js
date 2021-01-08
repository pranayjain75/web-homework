const graphql = require('graphql');
const TransactionType = require('./transaction-type');
const UserType = require("./user-type");
const CompanyType = require("./company-type")
const Transactions = require('../query-resolvers/transaction-resolvers.js');
const Companies = require('../query-resolvers/company-resolvers.js')
const Users = require('../query-resolvers/user-resolvers.js')

const { GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } = graphql;
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Transactions.findOne(args.id);
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Transactions.find(args);
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Companies.findOne(args.id);
      }
    },
    companies: {
      type: GraphQLList(CompanyType),
      args: {
        id: { type: GraphQLString },
        credit_line: { type: GraphQLFloat },
        available_credit: { type: GraphQLFloat }
      },
      resolve(parentValue, args) {
        return Companies.find(args);
      }
    },
    searchUser: {
      type: GraphQLList(UserType),
      args: {
        name: { type: GraphQLString }
        //     firstName: { type: GraphQLString },
        // lastName: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Users.searchUser(args.name);
      }
    },

    filterTransactions: {
      type: GraphQLList(TransactionType),
      args: {
        min: { type: GraphQLFloat },
        max: { type: GraphQLFloat }
      },
      resolve(parentValue, args) {
        return Transactions.filter(args.min, args.max);
      }
    }
  })
});

module.exports = RootQuery;