// Import the required packages and modules.
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit the process with failure
    }
};

//Export connectDB
module.exports = connectDB;