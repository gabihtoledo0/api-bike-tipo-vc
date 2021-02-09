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
    const { id_user } = request.params;
    const { finish_date, finish_time, id_finished_station } = request.body;

    const travelsRepository = getRepository(Travel);

    let updatedIdUser;

    updatedIdUser = await travelsRepository.findOne({
      id_user: id_user,
      finish_time: "",
    });

    try {
      if (updatedIdUser) {
        const updatedTravel = await travelsRepository.findOneOrFail(
          updatedIdUser?.id
        );
        if (updatedTravel.id_initial_station !== id_finished_station) {
          updatedTravel.finish_date = finish_date || updatedTravel.finish_date;
          updatedTravel.finish_time = finish_time || updatedTravel.finish_time;
          updatedTravel.id_finished_station =
            id_finished_station || updatedTravel.id_finished_station;

          await travelsRepository.save(updatedTravel);
          return response.json(updatedTravel);
        } else {
          return response.status(401).json({
            message:
              "Você não pode deixar sua bike na mesma estação que retirou :(",
          });
        }
      } else {
        return response.status(403).json({
          message:
            "Usuário não foi encontrado viajando",
        });
      }
    } catch {
      return response
        .status(400)
        .json({ message: "Algo deu errado com a atualização de dados." });
    }
  },

  async create(request: Request, response: Response) {
    const {
      id_user,
      id_initial_station,
      id_finished_station,
      name_station,
      initial_date,
      initial_time,
      finish_time,
      finish_date,
    } = request.body;

    const travelsRepository = getRepository(Travel);

    const data = {
      id_user,
      id_initial_station,
      id_finished_station,
      name_station,
      initial_date,
      initial_time,
      finish_time,
      finish_date,
    };

    const schema = Yup.object().shape({
      id_user: Yup.number().required(),
      id_initial_station: Yup.number().required(),
      id_finished_station: Yup.number().notRequired(),
      name_station: Yup.string().required(),
      initial_date: Yup.string().required(),
      initial_time: Yup.string().required(),
      finish_date: Yup.string().notRequired(),
      finish_time: Yup.string().notRequired(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    let travelIdUser;

    travelIdUser = await travelsRepository.findOne({
      id_user: id_user,
      finish_time: "",
    });

    if (!travelIdUser) {
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
