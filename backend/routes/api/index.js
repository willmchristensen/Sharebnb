const router = require('express').Router();
// testing api router with fetch through brower
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
