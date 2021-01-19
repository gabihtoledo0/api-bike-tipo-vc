import { getRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import userView from "../views/users_view";
import * as Yup from "yup";

var nodeBase64 = require("nodejs-base64-converter");
("use strict");

export default {
  async index(response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();
    return response.json(userView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    function hash(password: string) {
      return nodeBase64.decode(password);
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    user.password = hash(user.password);
    user.nameCard = hash(user.nameCard);
    user.expiry = hash(user.expiry);

    return response.json(userView.render(user));
  },

  async updatedUser(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      numberCard,
      nameCard,
      expiry,
      password,
    } = request.body;

    const usersRepository = getRepository(User);

    function hash(password: string) {
      return nodeBase64.encode(password);
    }

    try {
      const updatedUser = await usersRepository.findOneOrFail(id);

      updatedUser.name = name || updatedUser.name;
      updatedUser.email = email || updatedUser.email;
      updatedUser.phone = phone || updatedUser.phone;
      updatedUser.numberCard = numberCard || updatedUser.numberCard;
      updatedUser.nameCard = hash(nameCard) || updatedUser.nameCard;
      updatedUser.expiry = hash(expiry) || updatedUser.expiry;
      updatedUser.password = hash(password) || updatedUser.password;

      await usersRepository.save(updatedUser);
      return response.json(updatedUser);
    } catch {
      return response
        .status(400)
        .send("Algo deu errado com a atualização de dados.");
    }
  },

  async authenthication(req: Request, res: Response, next: any) {
    const usersRepository = getRepository(User);

    const { email } = req.body;

    const hash = nodeBase64.encode(req.body.password);

    let existingUser;

    try {
      existingUser = await usersRepository.findOne({
        email: email,
      });
    } catch (err) {
      const error = res.status(401).json({
        message: "O login falhou por favor tente novamente mais tarde.",
      });
      return next(error);
    }

    if (!existingUser || existingUser.password !== hash) {
      const error = res
        .status(401)
        .json({ message: "Email ou senha inválidos" });
      return next(error);
    }

    res.json({ message: "Logged in!", id: existingUser.id });
  },

  async create(request: Request, response: Response, next: any) {
    const { name, email, phone, numberCard } = request.body;

    const usersRepository = getRepository(User);

    const hashPassword = nodeBase64.encode(request.body.password);
    const hashNameCard = nodeBase64.encode(request.body.nameCard);
    const hashExpiry = nodeBase64.encode(request.body.expiry);

    const data = {
      name,
      email,
      phone,
      password: hashPassword,
      numberCard,
      nameCard: hashNameCard,
      expiry: hashExpiry,
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
    let existingUser;

    try {
      existingUser = await usersRepository.findOne({
        email: email,
      });
    } catch (err) {
      const error = response.status(401).json({
        message: "O cadastro falhou por favor tente novamente mais tarde.",
      });
      return next(error);
    }

    if (existingUser) {
      const error = response
        .status(401)
        .json({ message: "Email já cadastrado" });
      return next(error);
    } else {
      await usersRepository.save(user);
      return response.status(201).json(user);
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    await usersRepository.delete(id);

    return response.json({ message: "usuario deletado" });
  },
};
