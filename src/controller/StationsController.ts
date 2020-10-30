import { getRepository } from "typeorm";
import Station from "../models/Station";
import { Request, Response } from "express";
import stationView from "../views/stations_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const stationsRepository = getRepository(Station);

    const stations = await stationsRepository.find();
    return response.json(stationView.renderMany(stations));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const stationsRepository = getRepository(Station);

    const station = await stationsRepository.findOneOrFail(id);
    return response.json(stationView.render(station));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      bikeAvailable,
      bikeUnavailable,
      code,
    } = request.body;

    const stationsRepository = getRepository(Station);

    const data =  {
      name,
      latitude,
      longitude,
      bikeAvailable,
      bikeUnavailable,
      code,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      bikeAvailable: Yup.number().required().max(999),
      bikeUnavailable: Yup.number().required().max(999),
      code: Yup.number().required().max(999999),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const station = stationsRepository.create(data);

    await stationsRepository.save(station);

    return response.status(201).json(station);
  },
};
