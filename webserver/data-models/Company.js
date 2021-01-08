const { model, Schema, SchemaTypes } = require('mongoose')
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const CompanySchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String, default: null },
    credit_line: { type: Number, default: null },
    available_credit: { type: Number, default: null },
})
CompanySchema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });

const CompanyModel = model('company', CompanySchema)

module.exports = {
    CompanyModel,
    CompanySchema,
    default: CompanySchema
}