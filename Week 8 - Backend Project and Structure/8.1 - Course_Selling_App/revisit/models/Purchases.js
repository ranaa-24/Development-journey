const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    }
});

module.exports = mongoose.model('purchase', PurchaseSchema);