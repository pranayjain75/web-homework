const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');


const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  dob: { type: String, default: null },
  company_id: { type: String, default: null }
})

UserSchema.plugin(mongoose_fuzzy_searching, { fields: ['firstName', 'lastName'] });


const model = mongoose.model('user', UserSchema)

module.exports = {
  UserModel: model,
  UserSchema,
  default: UserSchema
}
