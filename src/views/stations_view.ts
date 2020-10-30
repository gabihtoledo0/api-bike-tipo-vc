import Station from "../models/Station";

export default {
  render(station: Station) {
    return {
      id: station.id,
      name: station.name,
      latitude: station.latitude,
      longitude: station.longitude,
      bikeAvailable: station.bikeAvailable,
      bikeUnavailable: station.bikeUnavailable,
      code: station.code,
    };
  },

  renderMany(stations: Station[]) {
    return stations.map(station => this.render(station))
  }
};
