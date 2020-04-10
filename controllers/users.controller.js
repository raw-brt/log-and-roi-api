const User        = require('../models/user.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then(user => res.status(201).json(user))
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        throw createError(404, 'User not found');
      }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        throw createError(404, 'User not found');
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .then(user => {
      if (user) {
        res.status(204).json();
      } else {
        throw createError(404, 'User not found');
      }
    })
    .catch(next);
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw createError(400, 'Missed credentials');
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        throw createError(404, 'User not found');
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              throw createError(400, 'Invalid password');
            } else {
              req.session.user = user;
              res.json(user);
            }
          })
      }
    })
    .catch(next);
}

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.status(204).json();
}