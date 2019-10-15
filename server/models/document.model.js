const Sequelize = require('sequelize');

const sequelize = require('../config/database');
const tableName = 'documents';

const Document = sequelize.define(
  'Document',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    agency_profile_id: {
      type: Sequelize.UUID,
      allowNull: false
    }
  },
  { tableName, timestamps: false }
);

module.exports = Document;
