const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
// mongoose.ObjectId also works, its a alias of 'mongoose.Types.ObjectId' 

const purchasesSchema = new mongoose.Schema({
    courseId : ObjectId, 
    userId : ObjectId
});

module.exports = mongoose.model('Purchases', purchasesSchema);

