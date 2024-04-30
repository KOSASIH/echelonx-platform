const authMiddleware = require('../middleware/auth');

// Add middleware
app.use('/api', authMiddleware);
