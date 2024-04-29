const aiAnalytics = require('../src/ai-analytics');

describe('AI Analytics Module', () => {
  it('should initialize the AI Analytics module successfully', () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    expect(aiAnalyticsModule).toBeDefined();
    expect(aiAnalyticsModule.name).toBe('AI Analytics Module');
  });

  it('should start the AI Analytics module successfully', async () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    const startPromise = aiAnalyticsModule.start();
    expect(startPromise).resolves.toBeUndefined();
  });

  it('should stop the AI Analytics module successfully', async () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    await aiAnalyticsModule.start();
    const stopPromise = aiAnalyticsModule.stop();
    expect(stopPromise).resolves.toBeUndefined();
  });

  it('should perform sentiment analysis successfully', async () => {
    const aiAnalyticsModule = aiAnalytics.initializeAIAnalytics();
    await aiAnalyticsModule.start();
    const result = await aiAnalyticsModule.performSentimentAnalysis('EchelonX is a great platform!');
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });
});
