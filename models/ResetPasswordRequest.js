const { Schema, model } = require('mongoose');

const ResetPasswordRequest = new Schema(
  {
    expiryAt: { type: Date },
    userId: { type: Schema.Types.ObjectId },

  },
);

module.exports = model('reset_password_request', ResetPasswordRequest);
