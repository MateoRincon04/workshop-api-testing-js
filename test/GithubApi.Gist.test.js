const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

const gistExample = `
function add(a , b) {
  return a + b;
}
`;

let gistLink;
let finalStatus;

describe('GitHub API DELETE method test and practice', () => {
  const Gist = {
    description: 'Gist promise example',
    public: true,
    files: {
      'promiseExample.js': {
        content: gistExample
      }
    }
  };

  describe('Creating a new Gist', () => {
    it('Then the new gist should be created', () => agent.post('https://api.github.com/gists')
      .send(Gist)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.CREATED);
        expect(response.body.description).to.equal('Gist promise example');
        expect(response.body.public).to.equal(true);
        // expect(response.body).to.containSubset(Gist);
        gistLink = response.body.url;
      }));
  });

  describe('Validateing the existence of the created gist', () => {
    it('Then the gist existence should be validated', () => agent.get(gistLink)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
      }));
  });

  describe('Deleting the creating gist', () => {
    it('Then the created gist should be deleted', () => agent.delete(gistLink)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
      }));
  });

  describe('Validating if the gist still exists', () => {
    before(async () => {
      try {
        await agent.get(gistLink)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
      } catch (response) {
        finalStatus = response.status;
      }
    });
    it('Then the gist removal should be validated', () => {
      expect(finalStatus).to.equal(statusCode.NOT_FOUND);
    });
  });
});
