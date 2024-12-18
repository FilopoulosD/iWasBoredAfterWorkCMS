const mongoose = require('mongoose');

// Domain Schema with name and the id of the template that its used
const DomainSchema = new mongoose.Schema({
    domainName: {
        type:String, 
        required: true,
        unique: true
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Template', required: true
    },
});

module.exports = mongoose.model('Domain', DomainSchema);