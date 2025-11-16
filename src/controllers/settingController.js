const { Setting } = require('../models');
exports.listSettings = async (req,res)=>{ const s = await Setting.findAll(); res.json(s); };
exports.upsertSetting = async (req,res)=>{
  const { key, value } = req.body;
  const [setting, created] = await Setting.findOrCreate({ where: { key }, defaults: { value }});
  if(!created){ await setting.update({ value }); }
  res.json(setting);
};
