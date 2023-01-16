const router = require('express').Router();

router.get('/usertest', (req, res) => res.send('Testing World in 3...2..1.'));

router.post('/testpost', (req, res) => {
  const username = req.body.username;
  //   console.log(username);
  res.send('User name is : ' + username);
});

module.exports = router;
