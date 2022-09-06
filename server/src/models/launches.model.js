const planets = require("./planets.mongo");

let latetsFlightNumber = 100;

const launchesDatabase = require("./launches.mongo");

const launches = new Map();

const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("December 27, 2030"),
	target: "Kepler-442 b",
	customers: ["ZTM", "NASA"],
	upcoming: true,
	success: true,
};

saveLaunches(launch);

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
	return launches.has(launchId);
}

async function saveLaunches(launch) {
	const planet = await planets.findOne({ keplerName: launch.target });

	if (!planet) {
		throw new Error("No matching planet found");
	}

	await launchesDatabase.updateOne(
		{ flightNumber: launch.flightNumber },
		launch,
		{ upsert: true }
	);
}

async function getAllLaunches() {
	return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

function addNewLaunch(launch) {
	latetsFlightNumber++;
	launches.set(
		latetsFlightNumber,
		Object.assign(launch, {
			flightNumber: latetsFlightNumber,
			customers: ["ZTM", "NASA"],
			upcoming: true,
			success: true,
		})
	);
}

function abortLaunchById(launchId) {
	const aborted = launches.get(launchId);
	aborted.upcoming = false;
	aborted.success = false;
	return aborted;
}

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
