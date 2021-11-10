const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

let selectedRepository;

describe('Verifying MateoRincon04 has at least one public repository', () => {
  it('Then the presence of a public repository from MateoRincon04 is verified', () => agent.get('https://api.github.com/users/MateoRincon04')
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.public_repos).to.be.above(0);
    }));
});

describe('Selecting and verifying a MateoRincon04 repository', () => {
  it('Then the selected repository from MateoRincon04 repository list should be verified', () => agent.get('https://api.github.com/users/MateoRincon04/repos')
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      [selectedRepository] = response.body;
      expect(selectedRepository).to.not.eql(null);
    }));
});

describe('Build an issue in MateoRincon04 selected repository', () => {
  it('Then the issue MateoRincon04 should be built', () => agent.post(`https://api.github.com/repos/MateoRincon04/${selectedRepository.name}/issues`)
    .send({ title: 'Issue created via GitHub API by MateoRincon04 for his own repository' })
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      expect(response.body.title).to.equal('Issue created via GitHub API by MateoRincon04 for his own repository');
      expect(response.body.body).to.equal(null);
    }));
});

describe('Modify the issue in MateoRincon04 selected repository to add body', () => {
  it('Then the issue MateoRincon04 should be built', () => agent.patch(`https://api.github.com/repos/MateoRincon04/${selectedRepository.name}/issues/1`)
    .send({ title: 'Issue created via GitHub API by MateoRincon04 for his own repository', body: 'Body created via GitHub API by MateoRincon04 for his own repository' })
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      expect(response.body.title).to.equal('Issue created via GitHub API by MateoRincon04 for his own repository');
      expect(response.body.body).to.equal('Body created via GitHub API by MateoRincon04 for his own repository');
    }));
});
