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

  async updatedTravel(request: Request, response: Response) {
    const { id } = request.params;
    const { finish_date, finish_time } = request.body;

    const travelsRepository = getRepository(Travel);

    try {
      const updatedTravel = await travelsRepository.findOneOrFail(id);

      updatedTravel.finish_date = finish_date || updatedTravel.finish_date;
      updatedTravel.finish_time = finish_time || updatedTravel.finish_time;

      await travelsRepository.save(updatedTravel);
      return response.json(updatedTravel);
    } catch {
      return response
        .status(400)
        .send("Algo deu errado com a atualização de dados.");
    }
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

    let travelIdUser;

    travelIdUser = await travelsRepository.find({
      id_user: id_user,
      finish_time: "",
    });

    if (travelIdUser === []) {
      const travel = travelsRepository.create(data);

      await travelsRepository.save(travel);

      return response.status(201).json(travel);
    } else {
      response.status(401).json({
        message: "Ainda temos uma viagem em andamento.",
      });
    }
  },
};
