import { getRepository } from "typeorm";
import Travel from "../models/Travel";
import { Request, Response } from "express";
import travelView from "../views/travels_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const travelsRepository = getRepository(Travel);

    const travels = await travelsRepository.find();
    return response.json(travelView.renderMany(travels));
  },

  async show(request: Request, response: Response) {
    const { id_user } = request.params;
    const travelsRepository = getRepository(Travel);

    const travel = await travelsRepository.find({ id_user: id_user });
    return response.json(travel);
  },

  async create(request: Request, response: Response) {
    const {
      id_user,
      name_station,
      initial_date,
      initial_time,
      finish_time,
      finish_date,
    } = request.body;

    const travelsRepository = getRepository(Travel);

    const data = {
      id_user,
      name_station,
      initial_date,
      initial_time,
      finish_time,
      finish_date,
    };

    const schema = Yup.object().shape({
      id_user: Yup.number().required(),
      name_station: Yup.string().required(),
      initial_date: Yup.string().required(),
      initial_time: Yup.string().required(),
      finish_time: Yup.string().notRequired(),
      finish_date: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const travel = travelsRepository.create(data);

    await travelsRepository.save(travel);

    return response.status(201).json(travel);
  },
};
