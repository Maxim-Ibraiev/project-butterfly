const passport = require('passport')
require('../../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    if (req.get('Authorization')) {
      ;[, token] = req.get('Authorization').split(' ')
    }

    if (!user || err || token !== user?.token) {
      return res.status(401).json({
        Status: '401 Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Not authorized',
        },
      })
    }
    req.user = user

    return next()
  })(req, res, next)
}

module.exports = guard
