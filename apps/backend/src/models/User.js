class User {
  constructor({
    id,
    name,
    email,
    password,
    username,
    avatar,
    role, 
  }) {
    this.id = id; 
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
    this.avatar = avatar;
    this.role = role; 
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }

  static create(userData) {
    return new User({
      ...userData,
      username: userData.email.split("@")[0],
      avatar: `https://picsum.photos/seed/${userData.email}/200`,
    });
  }
}

export default User;