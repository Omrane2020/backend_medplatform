const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  authenticate: async (req,res,next)=>{
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({message:'No token'});
    const token = auth.split(' ')[1];
    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findByPk(payload.id);
      if(!user) return res.status(401).json({message:'Invalid token'});
      req.user = user;
      next();
    }catch(err){
      return res.status(401).json({message:'Unauthorized'});
    }
  },
  authorizeRole: (roles=[])=>{
    return (req,res,next)=>{
      if(!roles.includes(req.user.role)) return res.status(403).json({message:'Forbidden'});
      next();
    };
  }
};
