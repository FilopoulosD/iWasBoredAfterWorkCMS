const mongoose = require('mongoose');

// Try to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {});
        console.log('MongoDB connected!');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

//Export connectDB
module.exports = connectDB;