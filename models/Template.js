const mongoose = require('mongoose');

// Subfield schema for fields belonging in a repeater
const SubfieldSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    required: { 
        type: Boolean, 
        default: false 
    },
})

// Field Schema for the fields in a template
const FieldSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true
    },
    type: {
        type: String,
        required: true 
    },  // e.g., 'Text', 'Image', 'Repeater', etc.
    required: { 
        type: Boolean, 
        default: false 
    },
    subfields: [SubfieldSchema],            // This is used only if the field is a repeater
  });

// Template Schema
const TemplateSchema = new mongoose.Schema({
    name: {
        type: String, 
        required : true
    },
    fields: [FieldSchema],
});

module.exports = mongoose.model('Template', TemplateSchema);