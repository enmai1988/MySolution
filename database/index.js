const Sequelize = require('sequelize');
const config = require('config')['sequelize'];
const sampleData = require('./sampleData');

let db;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
    host: config.connection.host,
    dialect: config.client
  });
}

const Ticket = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  status: Sequelize.STRING,
  location: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  claimedAt: Sequelize.DATE,
  closedAt: Sequelize.DATE
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  avatarUrl: Sequelize.TEXT,
  role: { type: Sequelize.ENUM('student', 'mentor', 'admin'), allowNull: false },
  cohort: Sequelize.STRING
});

User.hasMany(Ticket);

Ticket.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId'
});

Ticket.belongsTo(User, {
  as: 'userClaimed',
  foreignKey: 'claimedBy'
});

db.sync({ force: true })
  .then(() => {
    User.bulkCreate(sampleData.users).then(() => {
      Ticket.bulkCreate(sampleData.tickets);
    });
  });

module.exports = { db, User, Ticket };
