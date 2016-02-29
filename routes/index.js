var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/',function(req,res){
  if(req.body['user'] && req.body['passwd']){
      console.log("coming...........");
      Customer.find({'Username':req.body['user'],'Password':req.body['passwd']},function(err,result){
          if (err) throw err;
          console.log(result);
          res.render('profile',{'username':result[0].Username,'AccountNo':result[0].AccountNo,'Balance':result[0].Amount});
      });
  }
  else{
    res.render('index');
  }
});
router.get('/signup',function(req,res,next){
    res.render('signup');
});
router.post('/signup',function(req,res){
    if (req.body['username']&& req.body['password']) {
        var newcustomer = new Customer({
            'Username': req.body['username'],
            'Emailid': req.body['emailid'],
            'SSN': req.body['ssn'],
            'PhoneNo': req.body['phoneno'],
            'Address': req.body['address'],
            'Password': req.body['password'],
            'AccountNo': Math.floor(Math.random() * 1000),
            'Amount': 0
        });
        newcustomer.save(function (err) {
            if (err) throw err;
            console.log("newcustomer is created");
        });
    }
    Customer.find({'Username':req.body['username']},function(err,result) {
        if (err) throw err;
        console.log(result);
        res.render('profile', {
            'username': result[0].Username,
            'AccountNo': result[0].AccountNo,
            'Balance': result[0].Amount
        });
    });
});
router.param('account',function(req,res,next,account){
          req.account =account;
          next();
});
router.get('/deposit/:account',function(req,res,next){
   res.render('deposit',{'AccountNo':req.account});
});
router.post('/deposit/:account',function(req,res) {
    console.log(req.account);
    if (req.body['amount']) {
        Customer.findOneAndUpdate({'AccountNo': req.account},{'Amount':req.body['amount']}, function (err,res) {
            if (err) throw err;
                console.log("success");
        });
    }
    Customer.find({'AccountNo': req.account}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('profile', {
            'username': result[0].Username,
            'AccountNo': result[0].AccountNo,
            'Balance': result[0].Amount
        });
    });
});
router.param('account',function(req,res,next,account){
    req.account =account;
    next();
});
router.get('/withdraw/:account',function(req,res,next){
        res.render('withdraw', {'AccountNo': req.account});
});
router.post('/withdraw/:account',function(req,res){
    if (req.body['amount']) {
        console.log(req.body['amount']);
        Customer.findOne({'AccountNo': req.account}, function (err, result) {
            if (err) throw err;
            result.Amount = result.Amount - parseInt(req.body['amount']);
            console.log(result.Amount);
            result.save();
        });
     /*   Customer.findOneAndUpdate({'AccountNo': req.account},{'Amount': redamount}, function (err,res) {
            if (err) throw err;
            console.log("success");
        }); */
    }
    Customer.find({'AccountNo': req.account}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('profile', {
            'username': result[0].Username,
            'AccountNo': result[0].AccountNo,
            'Balance': result[0].Amount
        });
    });
});

module.exports = router;
