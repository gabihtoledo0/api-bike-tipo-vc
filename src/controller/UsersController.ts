import { getRepository } from "typeorm";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
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

  async authenthication(req: Request, res: Response, next: any) {
    const usersRepository = getRepository(User);

    const { email, password } = req.body;

    let existingUser;

    try {
      existingUser = await usersRepository.findOne({ email: email });
    } catch (err) {
      const error = res
        .status(401)
        .json({ message: "Login failed, please try again later." });
      return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
      const error = res
        .status(401)
        .json({ message: "Invalid credentials, login failed." });
      return next(error);
    }

    res.json({ message: "Logged in!" });
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      password,
      numberCard,
      nameCard,
      expiry,
    } = request.body;

    const usersRepository = getRepository(User);

    const data = {
      name,
      email,
      phone,
      password,
      numberCard,
      nameCard,
      expiry,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.string().required(),
      password: Yup.string().required(),
      numberCard: Yup.number().required(),
      nameCard: Yup.string().required(),
      expiry: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(user);
  },
};
