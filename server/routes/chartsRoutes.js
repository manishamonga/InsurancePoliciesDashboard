// we have to configure router here

const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');


router.get('/chartData',(req,res) => {
    if(req.query.region){
        getChartDataByRegion(req.query.region);
    }
    else {
        const aggregateData = Customer.aggregate([
            { $group: {
                    _id: {name: "$vehicleSegment", month: {$month: {$toDate:"$dateOfPurchase"}}},
                    count: { $sum: 1}
                }},
            {$group: {
                    _id: "$_id.name",
                    customers: {$push: {month: "$_id.month", count: "$count"}}
                }}
        ]);

        aggregateData.then(data => {
            let resultArray =[];
            data.map(policy => {
                policy.customers.map(policyData => {
                    resultArray.push(policyData);
                })
            })
            res.send(resultArray);
        }).catch(err => {
            res.send('No data found');
        })
    }

    function getChartDataByRegion(region){
        const aggregateData = Customer.aggregate([
            {
                $match: {
                    'region': { $eq: region }
                } ,
            },
            { $group: {
                    _id: {name: "$vehicleSegment", month: {$month: {$toDate:"$dateOfPurchase"}}},
                    count: { $sum: 1}
                }},
            {$group: {
                    _id: "$_id.name",
                    customers: {$push: {month: "$_id.month", count: "$count"}}
                }
            }
        ]);

        aggregateData.then(data => {
            let resultArray =[];
            data.map(policy => {
                policy.customers.map(policyData => {
                    resultArray.push(policyData);
                })
            })
            res.send(resultArray);
        }).catch(err => {
            res.send('No data found');
        })
    }

});

module.exports = router;
