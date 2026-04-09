require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');

async function main() {
  try {
    await sequelize.authenticate();

    const username = 'admin321';
    const password = 'admin321';
    const role = 'admin';

    const existing = await User.findByPk(username);
    if (existing) {
      console.log('User already exists');
      process.exit(0);
    }

    const passwordhash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      passwordhash,
      role,
      created_on: new Date()
    });

    console.log('User created successfully');
    console.log({ username, password, role });
    process.exit(0);
  } catch (err) {
    console.error('Failed to create user:', err);
    process.exit(1);
  }
}

main();