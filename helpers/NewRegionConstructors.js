class State {
  constructor(
    name,
    collectedOn,
    medianRent,
    monthlyChange,
    quarterlyChange,
    yearlyChange,
    sizeRank,
    abbr) {
    this.name = name;
    this.collected_on = collectedOn;
    this.median_rent = medianRent;
    this.monthly_change = monthlyChange;
    this.quarterly_change = quarterlyChange;
    this.yearlyChange = yearlyChange;
    this.size_rank = sizeRank;
    this.abbr = abbr;
  }
}

class Metro extends State {
  constructor(stateId) {
    super();
    this.state_id = stateId;
  }
}

class City extends Metro {
  constructor(metroId) {
    super();
    this.metro_id = metroId;
  }
}

class Neighorhood extends City {
  constructor(cityId) {
    super();
    this.city_id = cityId;
  }
}

class Zipcode extends City {
  constructor(cityId) {
    super();
    this.city_id = cityId;
  }
}

module.exports = {
  State,
  Metro,
  City,
  Neighorhood,
  Zipcode,
};
