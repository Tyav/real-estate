const Property = require("../models/property.model");
const sequelize = require("../config/database");

class PropertyQueries {
  constructor(Model) {
    this.Model = Model;
  }

  create(payload) {
    return this.Model.create(payload);
  }

  findByUserId(user_id) {
    return this.Model.findOne({
      where: {
        user_id
      }
    });
  }

  findByUser(user_id) {
    return this.Model.findAll({
      where: {
        user_id
      }
    });
  }

  hasNoFilterOrFilter(search, { limit, offset }) {
    return sequelize.query(
      `SELECT * FROM properties WHERE id IN
	(SELECT id FROM properties WHERE location = :location OR category_id = :category_id OR name LIKE :name)
	 AND price BETWEEN :minPrice and :maxPrice ORDER by price ASC LIMIT :offset, :limit`,
      {
        replacements: { ...search, offset, limit },
        type: sequelize.QueryTypes.SELECT
      }
    );
  }

  cheapestProperty() {
    return sequelize.query("SELECT min(price) as minPrice FROM properties");
  }

  costliestProperty() {
    return sequelize.query("SELECT max(price) as maxPrice FROM properties");
  }

  async findByPropertyId(id) {
    return this.Model.findOne({ where: { id } });
  }
}

const propertyQuery = new PropertyQueries(Property);

module.exports = propertyQuery;