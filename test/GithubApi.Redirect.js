const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

let redirResponse;

describe('GitHub API HEAD and Redirect test and practice', () => {
  describe('Looking and getting the redirect-test url link', () => {
    before(async () => {
      try {
        await agent.head('https://github.com/aperdomob/redirect-test')
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
      } catch (response) {
        redirResponse = response;
      }
    });
    it('Then it should be redirected', () => {
      expect(redirResponse.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(redirResponse.response.res.headers.location).to.equal('https://github.com/aperdomob/new-redirect-test');
    });
  });

  describe('Looking and getting the redirect-test url with the GET method', () => {
    before(async () => {
      try {
        await agent.get('https://github.com/aperdomob/redirect-test')
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
      } catch (response) {
        redirResponse = response;
      }
    });
    it('Then it should be redirected', () => {
      expect(redirResponse.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(redirResponse.response.res.headers.location).to.equal('https://github.com/aperdomob/new-redirect-test');
    });
  });
});
