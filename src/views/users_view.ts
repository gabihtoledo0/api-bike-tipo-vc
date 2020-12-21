import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      numberCard: user.numberCard,
      nameCard: user.nameCard,
      expiry: user.expiry,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
