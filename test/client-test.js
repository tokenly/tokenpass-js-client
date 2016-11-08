var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var config = require('./config.json');
var TOKENPASS = require('../index.js');

var client_id = config.tokenpass.key;
var client_secret = config.tokenpass.secret;
var api_url = config.tokenpass.api_url;

if (!client_id || !client_secret || !api_url) {
  console.log('missing client_id, client_secret and api url');
  process.exit(1);
}

var client = new TOKENPASS(client_id,client_secret,api_url);
describe('The Tokenpass clinet', function() {
	it('should call checkTokenAccess', () => {	
		var username = 'ratinder'
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m', TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
		var res = client.checkTokenAccess(username,data)
		should.exist(res);
    });
    
    it('should call checkAddressTokenAccess', () => {	
		var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
		var data = {TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
		var res = client.checkAddressTokenAccess(address,data)
		should.exist(res);
    });
    
    it('should call getOAuthUserFromAccessToken', () => {	
		var data = {access_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m'}
		var res = client.getOAuthUserFromAccessToken(data)
		should.exist(res);
    });
    
    it('should call getPublicAddresses', () => {	
		var username = 'ratinder'
		var res = client.getPublicAddresses(username)
		should.exist(res);
    });
    
    it('should call getPublicAddressDetails', () => {	
		var username = 'ratinder'
		var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
		var res = client.getPublicAddressDetails(username,address)
		should.exist(res);
    });
    
    it('should call registerAddress', () => {	
		var postData = {address:'14eRVGNPQChSmSmNLH6RPjdwsNPc7rH2Z7', label:"Test address2", public: true, active:true, oauth_token: 'G9nIzjvKzamo3JyymepA44xjz7cSOBExILsCzvyQ', scope:'manage-address' }
		var res = client.registerAddress(postData)
		should.exist(res);
    });
    
    it('should call getAddressesForAuthenticatedUser', () => {	
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.getAddressesForAuthenticatedUser(data)
		should.exist(res);
    });
    
    
    it('should call getAddressDetailsForAuthenticatedUser', () => {	
		var address = '1HB628hSqivpFCjmKKmBMEyBE3VWPRvqeZ'	
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.getAddressDetailsForAuthenticatedUser(address,data)
		should.exist(res);
    });
    
    it('should call updateAddressDetails', () => {	
		var address = '14eRVGNPQChSmSmNLH6RPjdwsNPc7rH2Z7'	
		var data = {label:'Test update address',public: true, active:true,oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.updateAddressDetails(address,data)
		should.exist(res);
    });
    
    it('should call deleteAddress', () => {	
		var address = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'	
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.deleteAddress(address,data)
		should.exist(res);
    });
    
    it('should call lookupAddressByUser', () => {	
		var username = 'ratinder'
		var res = client.lookupAddressByUser(username)
		should.exist(res);
    });
      
    it('should call lookupUserByAddress', () => {	
		var address = '1BRBd4UCjt2N9qb5aANTeKKZCWEWYz5dSt'
		var res = client.lookupUserByAddress(address)
		should.exist(res);
    });
    
    it('should call getCombinedPublicBalances', () => {	
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.getCombinedPublicBalances(data)
		should.exist(res);
    });
    
    it('should call getCombinedProtectedBalances', () => {	
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m',scope:'tca,manage-address,private-address'}
		var res = client.getCombinedProtectedBalances(data)
		should.exist(res);
    });

});
