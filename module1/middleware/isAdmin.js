// middleware/isAdmin.js
function isAdmin(req, res, next) {
  // Allow if user is admin (real auth) OR username in body is 'admin'
  if (
    (req.user && req.user.role === 'admin') ||
    (req.body && req.body.createdByName && req.body.createdByName.toLowerCase() === 'admin')
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Only admins can perform this action.' });
  }
}
module.exports = isAdmin;