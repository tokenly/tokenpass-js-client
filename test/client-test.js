var should = require('should');
var sinon = require('sinon');
var config = require('./config.json')
var TOKENPASS = require('../index.js')

describe('The Tokenpass clinet', function() {
	it('should call checkTokenAccess', () => {	
		var client = new TOKENPASS(config.tokenpass.key,config.tokenpass.secret,config.tokenpass.api_url);
		var stub = sinon.stub(client);
		var username = 'ratinder'
		var data = {oauth_token:'otsU0YpM5bWN4Cj4lTcpC1ZBtRLMGSnhqAiqzt7m', TOKENLY: 1, LTBCOIN: 100000, stackop_1:'OR' }
		client.checkTokenAccess(username,data)
    });

});


function emptyPromise() {
    return new Promise((accept, reject)=>{
    });
}
