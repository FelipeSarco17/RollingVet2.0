const mongoose = require("mongoose");
const dbConnection = async () => {
    try {
        console.log("Intentando establecer la conexión");
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Conexión establecida");
    } catch (error) {
        console.error(error);
    }
}
module.exports = dbConnection;