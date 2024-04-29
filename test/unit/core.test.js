const core = require('../src/core');

describe('Core Module', () => {
  it('should initialize the platform successfully', () => {
    const platform = core.initializePlatform();
    expect(platform).toBeDefined();
    expect(platform.name).toBe('EchelonX Platform');
  });

  it('should start the platform successfully', async () => {
    const platform = core.initializePlatform();
    const startPromise = platform.start();
    expect(startPromise).resolves.toBeUndefined();
  });

  it('should stop the platform successfully', async () => {
    const platform = core.initializePlatform();
    await platform.start();
    const stopPromise = platform.stop();
    expect(stopPromise).resolves.toBeUndefined();
  });
});
