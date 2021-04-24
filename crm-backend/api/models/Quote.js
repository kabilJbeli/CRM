/**
 * Quote.js
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
    total: "number",
    reduction: "number",
    status: "string",
    clientID: {
      model:'company',
      required:true
    }
  },
  datastore: 'default',
};

