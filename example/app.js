var express = require('express')
var logger = require('morgan')
var session = require('express-session')
var config = require('./config.json')
var TOKENPASS = require("tokenpass-api")
var tokenapiModule = new TOKENPASS(config.tokenpass.key,config.tokenpass.secret,config.tokenpass.api_url);

var app = express()
app.use(logger('dev'))


/*********** checkTokenAccess ********/
app.get('/check_token_access', function (req, res) {		
	var username = 'ratinder'
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m', TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
	tokenapiModule.checkTokenAccess(username,data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** checkAddressTokenAccess ********/
app.get('/check_address_token_access', function (req, res) {		
	var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
	var data = {TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
	tokenapiModule.checkAddressTokenAccess(address,data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** getOAuthUserFromAccessToken ********/
app.get('/get_oauth_user_from_access_token', function (req, res) {		
	var data = {access_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m'}
	tokenapiModule.getOAuthUserFromAccessToken(data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** getPublicAddresses ********/
app.get('/get_public_addresses', function (req, res) {		
	var username = 'ratinder'
	tokenapiModule.getPublicAddresses(username).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** getPublicAddressDetails ********/
app.get('/get_public_address_details', function (req, res) {		
	var username = 'ratinder'
	var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
	tokenapiModule.getPublicAddressDetails(username,address).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** registerAddress ********/
app.get('/register_address', function (req, res) {		
	var postData = {address:'14eRVGNPQChSmSmNLH6RPjdwsNPc7rH2Z7', label:"Test address2", public: true, active:true, oauth_token: 'G9nIzjvKzamo3JyymepA44xjz7cSOBExILsCzvyQ', scope:'manage-address' }
	tokenapiModule.registerAddress(postData).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** getAddressesForAuthenticatedUser ********/
app.get('/get_addresses_for_authenticated_user', function (req, res) {	
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.getAddressesForAuthenticatedUser(data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** getAddressDetailsForAuthenticatedUser ********/
app.get('/get_address_details_for_authenticated_user', function (req, res) {
	var address = '1HB628hSqivpFCjmKKmBMEyBE3VWPRvqeZ'	
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.getAddressDetailsForAuthenticatedUser(address,data).then(function(result){
		console.log(result.result.verify_code);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** updateAddressDetails ********/
app.get('/update_address_details', function (req, res) {
	var address = '14eRVGNPQChSmSmNLH6RPjdwsNPc7rH2Z7'	
	var data = {label:'Test update address',public: true, active:true,oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.updateAddressDetails(address,data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** deleteAddress ********/
app.get('/delete_address', function (req, res) {
	var address = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'	
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.deleteAddress(address,data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** lookupUserByAddress ********/
app.get('/lookup_user_by_address', function (req, res) {
	var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
	tokenapiModule.lookupUserByAddress(address).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** lookupAddressByUser ********/
app.get('/lookup_address_by_user', function (req, res) {
	var username = 'ratinder'
	tokenapiModule.lookupAddressByUser(username).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** getCombinedPublicBalances ********/
app.get('/get_combined_public_balances', function (req, res) {
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.getCombinedPublicBalances(data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})

/*********** getCombinedProtectedBalances ********/
app.get('/get_combined_protected_balances', function (req, res) {
	var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
	tokenapiModule.getCombinedProtectedBalances(data).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


app.listen(3001, function () {
  console.log('Express server listening on port ' + 3001)
})
