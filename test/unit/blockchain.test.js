const blockchain = require('../src/blockchain');

describe('Blockchain Module', () => {
  it('should initialize the Blockchain module successfully', () => {
    const blockchainModule = blockchain.initializeBlockchain();
    expect(blockchainModule).toBeDefined();
    expect(blockchainModule.name).toBe('Blockchain Module');
  });

  it('should start the Blockchain module successfully', async () => {
    const blockchainModule = blockchain.initializeBlockchain();
    const startPromise = blockchainModule.start();
    expect(startPromise).resolves.toBeUndefined();
  });

  it('should stop the Blockchain module successfully', async () => {
    const blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
    const stopPromise = blockchainModule.stop();
    expect(stopPromise).resolves.toBeUndefined();
  });

  it('should create a new block successfully', async () => {
    const blockchainModule = blockchain.initializeBlockchain();
    await blockchainModule.start();
    const newBlock = await blockchainModule.createNewBlock('transaction data');
    expect(newBlock).toBeDefined();
    expect(newBlock.index).toBeGreaterThanOrEqual(0);
    expect(newBlock.timestamp).toBeDefined();
    expect(newBlock.data).toBe('transaction data');
    expect(newBlock.previousHash).toBeDefined();
    expect(newBlock.hash).toBeDefined();
  });
});
