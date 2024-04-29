const integration = require('../src/integration');
const aiAnalytics = require('../src/ai-analytics');
const blockchain = require('../src/blockchain');

describe('Integration Module Integration', () => {
  let integrationModule;

  beforeAll(async () => {
    integrationModule = integration.initializeIntegration();
    await integrationModule.start();
  });

  afterAll(async () => {
    await integrationModule.stop();
  });

  it('should initialize the AI Analytics module successfully', () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    expect(aiAnalyticsModule).toBeDefined();
    expect(aiAnalyticsModule.name).toBe('AI Analytics Module');
  });

  it('should initialize the Blockchain module successfully', () => {
    const blockchainModule = blockchain.initializeBlockchain();
    expect(blockchainModule).toBeDefined();
    expect(blockchainModule.name).toBe('Blockchain Module');
  });

  it('should connect to an external service successfully', async () => {
    const result = await integrationModule.connectToExternalService('https://external-service.com');
    expect(result).toBeDefined();
    expect(result.connected).toBe(true);
  });

  it('should analyze a transaction successfully', async () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    await aiAnalyticsModule.start();
    const blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
    const newBlock = await blockchainModule.createNewBlock('transaction data');
    const result = await aiAnalyticsModule.analyzeTransaction(newBlock);
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('should analyze a block successfully', async () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    await aiAnalyticsModule.start();
    const blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
    const newBlock = await blockchainModule.createNewBlock('transaction data');
    const result = await aiAnalyticsModule.analyzeBlock(newBlock);
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });
});
