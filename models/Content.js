const mongoose = require('mongoose');

// Subfield values for repeater rows
const SubfieldValueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Can store any type (string, number, etc.)
    },
    order: {
        type: Number,
    },
});

// Main field values
const FieldValueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
    order: {
        type: Number,
    },
    subfields: [SubfieldValueSchema], // Only used if the field is a repeater
});

// Content Schema that binds domain, template and the writers content
const ContentSchema = new mongoose.Schema({
    domainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true,
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true,
    },
    fields: [FieldValueSchema],
});

module.exports = mongoose.model('Content', ContentSchema);
