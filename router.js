const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/v1/:regionType', controller.getRegionData);
router.get('/v1/:regionType/:id', controller.getSpecificRegionData);

router.post('/v1/:regionType/', controller.addRegionData);
// router.post('/v1/users/add', controller.addUser);
// router.post('/v1/users', controller.login);

router.put('/v1/:regionType', controller.updateRegionData);
router.put('/v1/:regionType/:id', controller.updateSpecificRegionData);
// Ideas: Modify Ranks or Nicknames on user's favorite regions

router.delete('/v1/:regionType', controller.deleteRegionData);
router.delete('/v1/:regionType/:id', controller.deleteSpecificRegionData);

module.exports = router;
