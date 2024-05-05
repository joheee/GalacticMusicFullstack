const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const shirtSchema = require('./shirt-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Shirt = mongoose.model('shirts', mongoose.Schema(shirtSchema));

db.once('open', async () => {
  logger.info('Successfully connected to MongoDB');

  try {
    const userCount = await User.countDocuments();
    const shirtCount = await Shirt.countDocuments();

    if (userCount === 0) {
      // Create 20 dummy users
      for (let i = 0; i < 20; i++) {
        await User.create({
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: 'password123',
        });
      }
      logger.info('Seed users completed!');
    }

    if (shirtCount === 0) {
      // Create 20 dummy shirts
      for (let i = 0; i < 20; i++) {
        await Shirt.create({
          name: `Shirt ${i + 1}`,
          size: 'M',
          price: '$20',
        });
      }
      logger.info('Seed shirts completed!');
    }
  } catch (error) {
    logger.error('Error seeding database:', error);
  }
});

module.exports = {
  mongoose,
  User,
  Shirt,
};
