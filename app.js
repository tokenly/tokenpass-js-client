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
	var rules = { TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
	var oauth_token = 'UwtfjTkU1CFQHGYS6KMdqdhvoPIG9YEI89eyO1wV'
	tokenapiModule.checkTokenAccess(username,rules,oauth_token).then(function(result){
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
	var rules = { public: 0}
	var oauth_token = 'c8OtXdVIALo9Z0a3C8P5oiBLUxVV3w2wfFnR8EFC'
	tokenapiModule.getPublicAddresses(username,rules,oauth_token).then(function(result){
		console.log(result);
		res.end(JSON.stringify(result))
	},function(err){
		console.error(err);
		res.end(JSON.stringify(err))
	})
})


/*********** registerAddress ********/
app.get('/register_address', function (req, res) {		
	var postData = {address:'Mohali Punjab', label:"Test My address", public: true, active:true }
	var oauth_token = 'UwtfjTkU1CFQHGYS6KMdqdhvoPIG9YEI89eyO1wV'
	tokenapiModule.registerAddress(postData,oauth_token).then(function(result){
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
