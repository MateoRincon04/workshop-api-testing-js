const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('content-length');
    expect(response.headers).to.have.property('content-type');
  });

  it('Consume PATCH Service', async () => {
    const response = await agent.patch('https://httpbin.org/patch');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.data).to.eq('');
  });

  it('Consume PATCH Service with query parameters', async () => {
    const query = {
      age: '31',
      city: 'Sogamoso',
      name: 'Francisco de Paula de Santander'
    };

    const response = await agent.patch('https://httpbin.org/patch').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume PUT Service with query parameters', async () => {
    const query = {
      name: 'Salvador Dali'
    };
    const header = {
      Accept: '*/*'
    };

    const response = await agent.put('https://httpbin.org/put').query(query).set(header);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
    expect(response.body.headers).to.have.property('Accept');
  });

  it('Consume DELETE Service with query parameters', async () => {
    const query = {
      name: 'Jota Mario Ramirez'
    };
    const header = {
      Accept: '*/*'
    };

    const response = await agent.delete('https://httpbin.org/delete').query(query).set(header);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
    expect(response.body.headers).to.have.property('Accept');
  });
});
