
const FeaturesModel = require("../models/FeaturesModel");
const LegalModel = require("../models/LegalModel");
const FeaturesListService = async () => {
    try {
        let data = await FeaturesModel.find();
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const LegalDetailsService = async (req) => {
    try {
        let type = req.params.type
        let data = await LegalModel.find({type:type});
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}

module.exports = {
    FeaturesListService,
    LegalDetailsService
}