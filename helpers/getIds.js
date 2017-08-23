
const getSpecificId = (db, regionType, name) => db(regionType).where('name', name).first('*');
const getAllRegionData = (db, regionType) => db(regionType).select();

module.exports = {
  getSpecificId,
  getAllRegionData,
};
