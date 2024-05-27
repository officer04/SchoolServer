const { Schema, model } = require('mongoose');

const ActiveEmailRequest = new Schema(
  {
    expiryAt: { type: Date },
    userId: { type: String },

  },
);

module.exports = model('active_email_request', ActiveEmailRequest);
