const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/v1/:regionType', controller.getRegionData);
router.get('/v1/:regionType/:id', controller.getSpecificRegionData);

module.exports = router;
