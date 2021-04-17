/**
 * Item.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: "number",
      autoIncrement: true
    },
    name: "string",
    description: "string",
    price: "number",
    quantity: "number",
    quoteID: {
      model:'quote'
    }
  },
  datastore: 'default',
};

