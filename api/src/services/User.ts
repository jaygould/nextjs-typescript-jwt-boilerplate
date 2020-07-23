import db from '../db/models';

class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public passwordHash: string;

  constructor(firstName: string | null, lastName: string | null, email: string | null) {
    if (firstName && lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    if (email) {
      this.email = email;
    }
  }

  setHashedPassword(passwordHash: string) {
    this.passwordHash = passwordHash;
  }

  doesUserExist() {
    return db.users.findOne({
      raw: true,
      where: { email: this.email }
    });
  }

  saveUser() {
    return db.users.create({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.passwordHash
    });
  }

  getUser(userId: number) {
    return db.users.findOne({
      raw: true,
      where: { id: userId },
      attributes: ['firstName', 'lastName', 'email']
    });
  }
}

export { User };
