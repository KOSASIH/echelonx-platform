const aiAnalytics = require('../src/ai-analytics');
const blockchain = require('../src/blockchain');
const integration = require('../src/integration');

describe('AI Analytics Module Integration', () => {
  let aiAnalyticsModule;

  beforeAll(async () => {
    aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    await aiAnalyticsModule.start();
  });

  afterAll(async () => {
    await aiAnalyticsModule.stop();
  });

  it('should initialize the Blockchain module successfully', () => {
    const blockchainModule = blockchain.initializeBlockchain();
    expect(blockchainModule).toBeDefined();
    expect(blockchainModule.name).toBe('Blockchain Module');
  });

  it('should initialize the Integration module successfully', () => {
    const integrationModule = integration.initializeIntegration();
    expect(integrationModule).toBeDefined();
    expect(integrationModule.name).toBe('Integration Module');
  });

  it('should perform sentiment analysis successfully', async () => {
    const result = await aiAnalyticsModule.performSentimentAnalysis('EchelonX is a great platform!');
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('should analyze a transaction successfully', async () => {
    const blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
    const newBlock = await blockchainModule.createNewBlock('transaction data');
    const result = await aiAnalyticsModule.analyzeTransaction(newBlock);
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('should connect to an external service successfully', async () => {
    const integrationModule = integration.initializeIntegration();
    await integrationModule.start();
    const result = await integrationModule.connectToExternalService('https://external-service.com');
    expect(result).toBeDefined();
    expect(result.connected).toBe(true);
  });
});
