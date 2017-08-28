const jwt = require('jsonwebtoken');
const express = require('express');
const controller = require('./controller');

const router = express.Router();

const privateKey = process.env.SECRET_KEY;


const checkAuth = (request, response, next) => {
  const token = request.get('Authorization');
  if (!token) {
    return response.status(403).json({ err: 'You must be authorized to hit this endpoint' });
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return response.status(403).json({ err: 'You must be authorized to hit this endpoint' });
    }
    next();
  });
};

router.post('/requestjwt', controller.generateJWT);

router.get('/v1/:regionType', controller.getRegionData);

router.post('/v1/:regionType', checkAuth, controller.addRegionData);

router.put('/v1/:regionType', checkAuth, controller.updateRegionData);
router.put('/v1/:regionType/:id', checkAuth, controller.updateSpecificRegionData);

router.delete('/v1/:regionType', checkAuth, controller.deleteRegionData);
router.delete('/v1/:regionType/:id', checkAuth, controller.deleteSpecificRegionData);

module.exports = router;
