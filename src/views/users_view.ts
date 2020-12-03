import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      senha: user.senha,
      numberCard: user.numberCard,
      nameCard: user.nameCard,
      dateCard: user.dateCard,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
