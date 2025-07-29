const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server berjalan dengan baik!',
  });
});

router.use(healthRoutes);

module.exports = router;
