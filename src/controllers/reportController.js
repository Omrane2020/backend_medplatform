const { User, Subscription, ActivityLog } = require('../models');
exports.generateReport = async (req,res)=>{
  // Simple example: counts
  const usersCount = await User.count();
  const subsCount = await Subscription.count();
  const logsCount = await ActivityLog.count();
  res.json({ usersCount, subsCount, logsCount, generatedAt: new Date() });
};
