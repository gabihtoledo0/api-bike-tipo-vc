import { getRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import userView from "../views/users_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();
    return response.json(userView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);
    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      senha,
      numberCard,
      nameCard,
      expiry,
      cvc,
    } = request.body;

    const usersRepository = getRepository(User);

    const data = {
      name,
      email,
      phone,
      senha,
      numberCard,
      nameCard,
      expiry,
      cvc,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.number().required(),
      senha: Yup.string().required(),
      numberCard: Yup.number().required(),
      nameCard: Yup.string().required(),
      expiry: Yup.string().required(),
      cvc: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(user);
  },
};
