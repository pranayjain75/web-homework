const graphql = require('graphql')
const path = require('path')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
} = graphql
const UserType = require('./user-type')
const { UserModel: User } = require(path.join('..', 'data-models', 'User'))


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        credit_line: { type: GraphQLFloat },
        available_credit: { type: GraphQLFloat },
        // users: {
        //     type: new GraphQLList(UserType),
        //     resolve(parentValue, args) {
        //         return User.find({ company_id: args.id }).populate('user')
        //     }
        // }
    })
})

module.exports = CompanyType
