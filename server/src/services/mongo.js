require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASSWORD}@nasacluster.5i4binh.mongodb.net/nasa?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
	console.log("Mongoose connection ready!");
});

mongoose.connection.on("error", (error) => {
	console.error(error);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};
