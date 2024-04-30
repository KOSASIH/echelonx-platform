const transactionRoutes = require('../routes/transaction');
const riskManagementRoutes = require('../routes/risk-management');
const investmentStrategyRoutes = require('../routes/investment-strategy');
const complianceRoutes = require('../routes/compliance');
const integrationRoutes = require('../routes/integration');

// Add routes
app.use('/transaction', transactionRoutes);
app.use('/risk-management', riskManagementRoutes);
app.use('/investment-strategy', investmentStrategyRoutes);
app.use('/compliance', complianceRoutes);
app.use('/integration', integrationRoutes);
