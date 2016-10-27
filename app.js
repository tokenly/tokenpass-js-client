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
	var oauth_token = 'pYREjIvuuV1yiJp1Vmt2cTN5Pt1jmgCKAiev3PfG'
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
	var rules = { public: 1 }
	var oauth_token = 'pYREjIvuuV1yiJp1Vmt2cTN5Pt1jmgCKAiev3PfG'
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
	var oauth_token = 'pYREjIvuuV1yiJp1Vmt2cTN5Pt1jmgCKAiev3PfG'
	tokenapiModule.getPublicAddresses(postData,oauth_token).then(function(result){
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
