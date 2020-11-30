const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// here we have to define schema and collection


let Customer = new Schema({
    policyId : {type: String},
    dateOfPurchase: {type: String },
    customerId: {type: String},
    fuelType: {type: String},
    vehicleSegment: {type: String},
    bodilyInjuryLiability: {type: Number},
    personalInjuryProtection: {type: Number},
    propertyDamageLiability: {type: Number},
    premium: {type: String},
    collision: {type: Number},
    comprehensive: {type: Number},
    customerIncomeGroup: {type: String},
    gender: {type: String},
    region: {type: String},
    maritalStatus: {type: Number}
 }, {
    collection: 'customers'
 })

module.exports = mongoose.model('Customer', Customer)
