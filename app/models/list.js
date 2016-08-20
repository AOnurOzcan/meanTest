var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    title: String,
    items: [{
      item: {
        type: String,
        default: ''
      }
    }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  });

//
// listSchema.pre('save', function (next) {
//   now = new Date();
//   this.updatedAt = now;
//   if (!this.createdAt) {
//     this.createdAt = now;
//   }
//   next();
// });

module.exports = mongoose.model('List', listSchema);
