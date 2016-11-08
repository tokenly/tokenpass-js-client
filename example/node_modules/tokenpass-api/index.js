var request = require('request')
var crypto = require('crypto')
var API_PREFIX = '/api/v1/';

var newNonce  = function(method,url,data,oauth_token,secret_key,nonce) {
	return '' + Math.round( 0 + new Date() / 1000)
}

var generateHmac  = function(method,url,data,oauth_token,secret_key,nonce) {
  var paramsBody = '{}'
  if (data != null) {
        paramsBody = JSON.stringify(data)
  }
  var permameter = method + "\n" + url + "\n" + paramsBody + "\n" + oauth_token + "\n" + nonce;
 
  return crypto.createHmac('SHA256', secret_key).update(permameter).digest('base64');
}


var requestCallPromise = function(_method, _url, _postHeaders, _postData){
  var data = _postData || {}
  return new Promise(function(resolve, reject) {
    var options = {
      url: _url,
      headers: _postHeaders
    };
    if (_method == 'GET') {
		options.qs = data;
		options.method = 'GET';
	}else {
		options.body = JSON.stringify(data)	
		options.method = _method
	}
    request(options, function (error, response, body) { 
      console.log(response)
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        resolve(info)
      }
      else{
		var err = JSON.parse(body);  
        reject(err)
      }
    });
  });
}

var TOKENPASS = function (_clientId,_clientSecret,_apiUrl) {
	
  if (!_clientId) throw new Error('Missing client id');
  if (!_clientSecret) throw new Error('Missing client secret');
  if (!_apiUrl) throw new Error('Missing app apiUrl');
  this.client_id = _clientId;
  this.client_secret = _clientSecret;
  this.api_url = _apiUrl;
  console.log(' init clinet id: '+ this.client_id)
  console.log(' init client_secret: '+ this.client_secret)
  console.log(' init api_url: '+ this.api_url)
}


/*********** checkTokenAccess ********/

TOKENPASS.prototype.checkTokenAccess = function (username,_postData) {
  var data = _postData || {}	
  var secret_key = this.client_secret
  var URL = this.api_url+API_PREFIX+'tca/check/'+username;
  var unix = newNonce()
  var signature = generateHmac('GET',URL,data,this.client_id,secret_key,unix);
  var headers = {
      'X-Tokenly-Auth-Api-Token': this.client_id,
      'X-Tokenly-Auth-Nonce': unix,
      'X-Tokenly-Auth-Signature': signature
  }
  return requestCallPromise('GET', URL, headers, data)
}

/*********** checkAddressTokenAccess ********/

TOKENPASS.prototype.checkAddressTokenAccess = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/check-address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** getOAuthUserFromAccessToken ********/

TOKENPASS.prototype.getOAuthUserFromAccessToken = function (data) {
  var URL = this.api_url+'/oauth/user'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** getPublicAddresses ********/

TOKENPASS.prototype.getPublicAddresses = function (username,_postData) {
  var data = _postData || {}	
  var secret_key = this.client_secret
  var URL = this.api_url+API_PREFIX+'tca/addresses/'+username;
  var unix = newNonce()
  var signature = generateHmac('GET',URL,data,this.client_id,secret_key,unix);
  var headers = {
      'X-Tokenly-Auth-Api-Token': this.client_id,
      'X-Tokenly-Auth-Nonce': unix,
      'X-Tokenly-Auth-Signature': signature
  }
 
  return requestCallPromise('GET', URL, headers, data)
}

/*********** registerAddress ********/

TOKENPASS.prototype.registerAddress = function (postData) {
  var URL = this.api_url+API_PREFIX+'tca/address'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  
  return requestCallPromise('POST', URL, headers, postData || {})
}

/*********** getAddressesForAuthenticatedUser ********/

TOKENPASS.prototype.getAddressesForAuthenticatedUser = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/addresses'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** getAddressDetailsForAuthenticatedUser ********/

TOKENPASS.prototype.getAddressDetailsForAuthenticatedUser = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** updateAddressDetails ********/

TOKENPASS.prototype.updateAddressDetails = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }

  return requestCallPromise('PATCH', URL, headers, data || {})
}

/*********** deleteAddress ********/

TOKENPASS.prototype.deleteAddress = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('DELETE', URL, headers, data || {})
}

/*********** lookupUserByAddress ********/

TOKENPASS.prototype.lookupUserByAddress = function (address,_postData) {
  var data = _postData || {}
  var secret_key = this.client_secret
  var URL = this.api_url+API_PREFIX+'lookup/address/'+address;
  var unix = newNonce()
  var signature = generateHmac('GET',URL,data,this.client_id,secret_key,unix);
  var headers = {
      'X-Tokenly-Auth-Api-Token': this.client_id,
      'X-Tokenly-Auth-Nonce': unix,
      'X-Tokenly-Auth-Signature': signature
  }
 
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** lookupAddressByUser ********/

TOKENPASS.prototype.lookupAddressByUser = function (username,_postData) {
  var data = _postData || {}	
  var secret_key = this.client_secret
  var URL = this.api_url+API_PREFIX+'lookup/user/'+username;
  var unix = newNonce()
  var signature = generateHmac('GET',URL,data,this.client_id,secret_key,unix);
  var headers = {
      'X-Tokenly-Auth-Api-Token': this.client_id,
      'X-Tokenly-Auth-Nonce': unix,
      'X-Tokenly-Auth-Signature': signature
  }
  
  return requestCallPromise('GET', URL, headers, data)
}

/*********** getPublicAddressDetails ********/

TOKENPASS.prototype.getPublicAddressDetails = function (username,address,_postData) {
  var data = _postData || {}	
  var secret_key = this.client_secret
  var URL = this.api_url+API_PREFIX+'tca/addresses/'+username+'/'+address;
  var unix = newNonce()
  var signature = generateHmac('GET',URL,data,this.client_id,secret_key,unix);
  var headers = {
      'X-Tokenly-Auth-Api-Token': this.client_id,
      'X-Tokenly-Auth-Nonce': unix,
      'X-Tokenly-Auth-Signature': signature
  }
 
  return requestCallPromise('GET', URL, headers, data)
}

/*********** getCombinedPublicBalances ********/

TOKENPASS.prototype.getCombinedPublicBalances = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/public/balances'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('GET', URL, headers, data || {})
}

/*********** getCombinedProtectedBalances ********/

TOKENPASS.prototype.getCombinedProtectedBalances = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/protected/balances'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestCallPromise('GET', URL, headers, data || {})
}

module.exports = TOKENPASS
