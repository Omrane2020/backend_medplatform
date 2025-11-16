const { Secretary } = require('../models');

exports.listSecretaries = async (req, res) => {
  const list = await Secretary.findAll();
  res.json(list);
};

exports.createSecretary = async (req, res) => {
  const d = await Secretary.create(req.body);
  res.status(201).json(d);
};

exports.getSecretary = async (req, res) => {
  const d = await Secretary.findByPk(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.json(d);
};

exports.updateSecretary = async (req, res) => {
  const d = await Secretary.findByPk(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  await d.update(req.body);
  res.json(d);
};

exports.deleteSecretary = async (req, res) => {
  const d = await Secretary.findByPk(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  await d.destroy();
  res.json({ message: 'deleted' });
};
