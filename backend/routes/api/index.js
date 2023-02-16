const router = require('express').Router();
// testing api router:
// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-user'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

module.exports = router;
