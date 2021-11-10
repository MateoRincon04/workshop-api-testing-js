const agent = require('superagent');
const { expect } = require('chai');

let query;

describe('GitHub API query parameters test and example', () => {
  describe('Users in query by default', () => {
    it('Then there should be some users by default', () => agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        query = response.body.length;
        console.log('The number of users in query by default is: ', query);
      }));
  });

  describe('Set the number of users in query by default to 10', () => {
    it('Then the number of users in query should be set to 10', () => agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .query({ per_page: 10 })
      .then((response) => {
        query = response.body.length;
        expect(query).to.equal(10);
      }));
  });

  describe('Set the number of users in query to 50', () => {
    it('Then the number of users in query should be set to 50', () => agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .query({ per_page: 50 })
      .then((response) => {
        query = response.body.length;
        expect(query).to.equal(50);
      }));
  });
});
