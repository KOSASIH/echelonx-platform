const blockchain = require('../src/blockchain');
const aiAnalytics = require('../src/ai-analytics');
const integration = require('../src/integration');

describe('Blockchain Module Integration', () => {
  let blockchainModule;

  beforeAll(async () => {
    blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
  });

  afterAll(async () => {
    await blockchainModule.stop();
  });

  it('should initialize the AI Analytics module successfully', () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    expect(aiAnalyticsModule).toBeDefined();
    expect(aiAnalyticsModule.name).toBe('AI Analytics Module');
  });

  it('should initialize the Integration module successfully', () => {
    const integrationModule = integration.initializeIntegration();
    expect(integrationModule).toBeDefined();
    expect(integrationModule.name).toBe('Integration Module');
  });

  it('should create a new block successfully', async () => {
    const newBlock = await blockchainModule.createNewBlock('transaction data');
    expect(newBlock).toBeDefined();
    expect(newBlock.index).toBeGreaterThanOrEqual(0);
    expect(newBlock.timestamp).toBeDefined();
    expect(newBlock.data).toBe('transaction data');
    expect(newBlock.previousHash).toBeDefined();
    expect(newBlock.hash).toBeDefined();
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

  it('should connect to an external service successfully', async () => {
    const integrationModule = integration.initializeIntegration();
    await integrationModule.start();
    const result = await integrationModule.connectToExternalService('https://external-service.com');
    expect(result).toBeDefined();
    expect(result.connected).toBe(true);
  });
});
