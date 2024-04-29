const request = require('supertest');
const app = require('../src/core/app');
const aiAnalytics = require('../src/ai-analytics');
const blockchain = require('../src/blockchain');
const integration = require('../src/integration');

describe('EchelonX Platform End-to-End Test', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(3000);
    await aiAnalytics.initializeAIAnalytics().start();
    await blockchain.initializeBlockchain().start();
    await integration.initializeIntegration().start();
  });

  afterAll(async () => {
    await aiAnalytics.initializeAIAnalytics().stop();
    await blockchain.initializeBlockchain().stop();
    await integration.initializeIntegration().stop();
    server.close();
  });

  it('should create a new transaction and analyze it successfully', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        sender: 'sender-address',
        receiver: 'receiver-address',
        amount: 100,
      })
      .expect(201);

    const transaction = response.body;
    const analysisResult = await aiAnalytics.initializeAIAnalytics().analyzeTransaction(transaction);
    expect(analysisResult.score).toBeGreaterThanOrEqual(0);
    expect(analysisResult.score).toBeLessThanOrEqual(1);
  });

  it('should create a new block and analyze it successfully', async () => {
    const response = await request(app)
      .post('/blocks')
      .send({
        transactions: [
          {
            sender: 'sender-address',
            receiver: 'receiver-address',
            amount: 100,
          },
        ],
      })
      .expect(201);

    const block = response.body;
    const analysisResult = await aiAnalytics.initializeAIAnalytics().analyzeBlock(block);
    expect(analysisResult.score).toBeGreaterThanOrEqual(0);
    expect(analysisResult.score).toBeLessThanOrEqual(1);
  });

  it('should connect to an external service and retrieve data successfully', async () => {
    const result = await integration.initializeIntegration().connectToExternalService('https://external-service.com');
    expect(result.connected).toBe(true);
    expect(result.data).toBeDefined();
  });
});
