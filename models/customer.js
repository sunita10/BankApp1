/**
 * Created by Dunna on 2/27/2016.
 */
var mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/BankDB');

var customerSchema = new mongoose.Schema({
    EmailId: String,
    PhoneNo: String,
    SSN: String,
    Address : String,
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    AccountNo : Number,
    Amount: Number
});

var Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;


