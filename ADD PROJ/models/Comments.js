var mongoose = require('mongoose');
var CarSchema = new mongoose.Schema({
  foto: String,      
  name: String,
  title: String,
  url: String,
  upvotes: {type: Number, default: 0},
});
CarSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CarSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  if(this.upvotes<1){
	  this.upvotes=0;
	  
  }
  this.save(cb);
};

mongoose.model('Car', CarSchema);
