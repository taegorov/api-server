'use strict';

class Collection {
  constructor(name, model) {
    this.name = name;
    this.model = model;
  }

  // === READ === //
  read(id, options = {}) {
    let modelParams = { ...options };

    if (id) {
      modelParams.where = { id: id };
      return this.model.findOne(modelParams);
    } else {
      return this.model.findAll(modelParams);
    }
  }

  // === CREATE === //
  create(json) {
    return this.model.create(json);
  }

  // === UPDATE === //
  async update(id, json) {

    let row = await this.model.findOne({
      where: {
        id: id,
      }
    });

    let updatedRow = await row.update(json);

    return updatedRow;
  }

  // === DELETE === //
  delete(id) {
    return this.model.destroy({ where: { id: id } });
  }


  createAssociation(type, model, options) {
    console.log(type, model, options);
    try {
      this.model[type](model, options);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = Collection;