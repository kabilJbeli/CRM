/**
 * Contact.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {


 attributes: {
    id: {
      type: "number",
      autoIncrement:true
    },
    firstName: "string",
    lastName: "string",
    email: "string",
    phone: "number",
    companyID: {
      model:"company"
    }
  },
  datastore: 'default',
};
