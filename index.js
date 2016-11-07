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

var requestGetPromise = function(_url, _postHeaders, body){
  return new Promise(function(resolve, reject) {
    var options = {
      url: _url,
      method : 'GET',
      headers: _postHeaders,
      qs: body
    };
     
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

var requestPostPromise = function(_url, _postHeaders, _postData){
  return new Promise(function(resolve, reject) {
    var data = _postData || {}
    var options = {
      url: _url,
      headers: _postHeaders,
      method: 'POST',
      body: JSON.stringify(data)
    };
     
    request(options, function (error, response, body) {
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

var requestPatchPromise = function(_url, _postHeaders, _postData){
  return new Promise(function(resolve, reject) {
    var data = _postData || {}
    var options = {
      url: _url,
      headers: _postHeaders,
      method: 'PATCH',
      body: JSON.stringify(data)
    };
     
    request(options, function (error, response, body) {
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

var requestDeletePromise = function(_url, _postHeaders, _postData){
  return new Promise(function(resolve, reject) {
    var data = _postData || {}
    var options = {
      url: _url,
      headers: _postHeaders,
      method: 'DELETE',
      body: JSON.stringify(data)
    };
     
    request(options, function (error, response, body) {
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
  this.client_id = _clientId;
  this.client_secret = _clientSecret;
  this.api_url = _apiUrl;
  console.log(' init clinet id: '+ this.client_id)
  console.log(' init client_secret: '+ this.client_secret)
  console.log(' init api_url: '+ this.api_url)
}



/*TOKENPASS.prototype.call = function (_url, _postHeaders, body) {
	return new Promise(function(resolve, reject) {
		var options = {
		  url: _url,
		  method : 'GET',
		  headers: _postHeaders,
		  qs: body
		};
		 
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
}*/


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
  return requestGetPromise(URL, headers, data)
}

/*********** checkAddressTokenAccess ********/

TOKENPASS.prototype.checkAddressTokenAccess = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/check-address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
}

/*********** getOAuthUserFromAccessToken ********/

TOKENPASS.prototype.getOAuthUserFromAccessToken = function (data) {
  var URL = this.api_url+'/oauth/user'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
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
 
  return requestGetPromise(URL, headers, data)
}

/*********** registerAddress ********/

TOKENPASS.prototype.registerAddress = function (postData) {
  var URL = this.api_url+API_PREFIX+'tca/address'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }

  return requestPostPromise(URL, headers, postData || {})
}

/*********** getAddressesForAuthenticatedUser ********/

TOKENPASS.prototype.getAddressesForAuthenticatedUser = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/addresses'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
}

/*********** getAddressDetailsForAuthenticatedUser ********/

TOKENPASS.prototype.getAddressDetailsForAuthenticatedUser = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
}

/*********** verifyAddress ********/

TOKENPASS.prototype.verifyAddress = function (address,data) {
  
  var URL = this.api_url+API_PREFIX+'message/sign/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestPostPromise(URL, headers, data || {})
}

/*********** updateAddressDetails ********/

TOKENPASS.prototype.updateAddressDetails = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestPatchPromise(URL, headers, data || {})
}

/*********** deleteAddress ********/

TOKENPASS.prototype.deleteAddress = function (address,data) {
  var URL = this.api_url+API_PREFIX+'tca/address/'+address
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestDeletePromise(URL, headers, data || {})
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
 
  return requestGetPromise(URL, headers, data)
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
 
  return requestGetPromise(URL, headers, data)
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
 
  return requestGetPromise(URL, headers, data)
}

/*********** getCombinedPublicBalances ********/

TOKENPASS.prototype.getCombinedPublicBalances = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/public/balances'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
}

/*********** getCombinedProtectedBalances ********/

TOKENPASS.prototype.getCombinedProtectedBalances = function (data) {
  var URL = this.api_url+API_PREFIX+'tca/protected/balances'
  var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
  return requestGetPromise(URL, headers, data || {})
}


module.exports = TOKENPASS
