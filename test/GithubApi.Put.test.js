const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const { assert } = require('chai');

describe('GitHub API PUT method test and practice', () => {
  function test() {
    describe('Following the aperdomob user with PUT Method', () => {
      it('Then the aperdomob user should be followed', () => agent.put('https://api.github.com/user/following/aperdomob')
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .then((response) => {
          expect(response.status).to.equal(statusCode.NO_CONTENT);
          expect(response.body).to.eql({});
        }));
    });

    describe('Checking that MateoRincon04 is following aperdomob', () => {
      it('Then the aperdomob must be on followed users', () => agent.get('https://api.github.com/user/following')
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          assert.exists(response.body.find((element) => element.login === 'aperdomob'));
        }));
    });
  }

  test();
  describe('Verifying imdempotence of PUT method by calling endpoint', () => {
    test();
  });
});
