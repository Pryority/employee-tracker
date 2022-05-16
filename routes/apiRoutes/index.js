const express = require('express');
const router = express.Router();

// Add near the top of the file
const apiRoutes = require('./routes/apiRoutes');

router.use(require('./candidateRoutes'));

// Add after Express middleware
app.use('/api', apiRoutes);

module.exports = router;