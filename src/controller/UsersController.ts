import { getRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import userView from "../views/users_view";
import * as Yup from "yup";

const crypto = require("crypto");
const secret = "minhastringdeseguranca101010";
var nodeBase64 = require("nodejs-base64-converter");

export default {
  async index(request: Request, response: Response) {
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

    return response.json(userView.render(user));
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
    // function encrypt() {
    //   var cipher = crypto.createCipher("aes-256-ecb", secret);
    //   return (
    //     cipher.update(request.body.password, "utf8", "hex") +
    //     cipher.final("hex")
    //   );
    // }

    const { name, email, phone, numberCard, nameCard, expiry } = request.body;

    const usersRepository = getRepository(User);

    const hash = nodeBase64.encode(request.body.password);

    const data = {
      name,
      email,
      phone,
      password: hash,
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
};
