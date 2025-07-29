const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server sehat dan siap!',
  });
});

module.exports = router;
