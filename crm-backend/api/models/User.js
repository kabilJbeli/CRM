/**
 * User.js
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
    firstName:{
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },

  },

};

