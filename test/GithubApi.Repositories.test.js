const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const md5 = require('md5');

describe('Verifying Account', () => {
  it('Then the name, company and location of a github user are verified', () => agent.get('https://api.github.com/users/aperdomob')
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.name).equal('Alejandro Perdomo');
      expect(response.body.company).equal('Perficient Latam');
      expect(response.body.location).equal('Colombia');
    }));
});

describe('Verifying repository', () => {
  it('Then the repo name, privacy and description are verified', () => agent.get('https://api.github.com/users/aperdomob')
    .auth('token', process.env.ACCESS_TOKEN)
    .set('User-Agent', 'agent')
    .then((response) => {
      agent.get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .then((response1) => {
          expect(response1.status).to.equal(statusCode.OK);
          expect(response1.body.find((repo) => repo.name === 'jasmine-awesome-report').full_name).equal('aperdomob/jasmine-awesome-report');
          expect(response1.body.find((repo) => repo.name === 'jasmine-awesome-report').private).equal(false);
          expect(response1.body.find((repo) => repo.name === 'jasmine-awesome-report').description).equal('An awesome html report for Jasmine');
        });
    }));
});

describe('Download and compressing repository', () => {
  let compressedRepository;
  before(async () => {
    const zippedRepository = await agent.get('https://github.com/aperdomob/jasmine-awesome-report/archive/master.zip')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    compressedRepository = zippedRepository;
  });

  it('Then the repository should be downloaded and compressed', () => {
    expect(md5(compressedRepository)).to.equal('3449c9e5e332f1dbb81505cd739fbf3f');
  });

  describe('Verifying README.md file', () => {
    it('Then the README.md name, path and .sha are verified', () => agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        agent.get(response.body.contents_url)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .then((response1) => {
            expect(response1.status).to.equal(statusCode.OK);
            expect(response1.body.find((file) => file.name === 'README.md').name).equal('README.md');
            expect(response1.body.find((file) => file.name === 'README.md').path).equal('README.md');
            expect(response1.body.find((file) => file.name === 'README.md').sha).equal('1eb7c4c6f8746fcb3d8767eca780d4f6c393c484');
          });
      }));
  });

  describe('Download README.md file and verifying it', () => {
    let readMeFileContent;
    before(async () => {
      const apiResponse = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report/contents/')
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      const readMeFile = apiResponse.body.find((file) => file.name === 'README.md');
      const downloadedReadMeFile = await agent.get(readMeFile.download_url);
      readMeFileContent = downloadedReadMeFile.text;
    });

    it('Then the README file should be checked', () => {
      expect(md5(readMeFileContent)).to.equal('97ee7616a991aa6535f24053957596b1');
    });
  });
});
