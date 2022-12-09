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

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'kedalyze',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err: ErrorRequestHandler) =>
    console.log(`Error connecting to Mongo DB: ${err}`)
  );

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
  //added timestamps to userSchema
  {
    timestamps: { type: Number, required: true }
  });

userSchema.pre('save', function (next: NextFunction) {
  if (this.isNew || this.isModified('password')) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      // is the hash value type a number | string?
      .then((hash: any) => {
        this.password = hash;
        return next();
      })
      .catch((error: ErrorRequestHandler) => {
        return next('hash ERROR: ' + error);
      });
  }
});

module.exports = mongoose.model('User', userSchema);
