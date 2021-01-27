import Travel from "../models/Travel";

export default {
  render(travel: Travel) {
    return {
      id: travel.id,
      id_user: travel.id_user,
      id_initial_station: travel.id_initial_station,
      id_finished_station: travel.id_finished_station,
      name_station: travel.name_station,
      initial_date: travel.initial_date,
      initial_time: travel.initial_time,
      finish_date: travel.finish_date,
      finish_time: travel.finish_time,
    };
  },

  renderMany(travels: Travel[]) {
    return travels.map((travel) => this.render(travel));
  },
};
