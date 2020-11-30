// we have to configure router here

const express = require('express');
const router = express.Router();

const Customer = require('../models/customers');

router.get('/customers',(req,res) => {
let filter;
if(req.query.policyId){
    filter = {policyId : { $in: [req.query.policyId]}};
}
else if(req.query.customerId){
    filter = {customerId : { $in: [req.query.customerId]}};
}

Customer.find(filter,(err, customers) =>{
    if(err){
        res.status(400).send('No data');
    }
    res.send(customers);
});

});

router.put('/customers/:customerId',async (req,res) => {
    const filter = { customerId: req.params.customerId };
    const customer = {
     premium: req.body.premium
 };
    let doc = await Customer.findOneAndUpdate(filter, customer);
    if(doc){
        res.status(201).send('Updated Successfully');
    }else{
        res.send('Updation failed');
    }
});

module.exports = router;
