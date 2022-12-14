import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
} from 'express';

const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next: NextFunction) {
  if (this.isNew || this.isModified('password')) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then((hash: string) => {
        this.password = hash;
        return next();
      })
      .catch((error: ErrorRequestHandler) => {
        return next('hash ERROR: ' + error);
      });
  }
});

describe('user model', () => {
  let connection;
  let User;

  beforeAll(async () => {
    connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'kedalyze',
    });
    User = connection.model('User', userSchema);
  });

  afterAll(() => {
    connection.close();
  });

  test('hashes the password before saving', async () => {
    const user = new User({
      email: 'test@email.com',
      username: 'testuser',
      password: 'testpassword',
    });

    await user.save();

    expect(await bcrypt.compare('testpassword', user.password)).toBe(true);
  });
});
