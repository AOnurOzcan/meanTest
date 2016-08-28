var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    title: String,
    items: [{
      item: {
        type: String,
        default: ''
      },
      like: [
        {
          type: mongoose.Schema.Types.String,
          ref: 'User'
        }
      ]
    }],

    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('List', listSchema);
