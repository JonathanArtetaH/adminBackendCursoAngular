const mongoose = require('mongoose');
// const urlMongo = 'mongodb+srv://JonathanAH:JonathanDevMongo@cluster0.tpi2dyj.mongodb.net/Hospitaldb'

const dbconecc = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CNN, {
            // useNewParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('BD online');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbconecc
}