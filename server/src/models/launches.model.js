const launches = new Map();

let latetsFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("December 27, 2030"),
	target: "Kepler-442 b",
	customer: ["ZTM", "NASA"],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
}

function addNewLaunch(launch) {
	latetsFlightNumber++;
	launches.set(
		latetsFlightNumber,
		Object.assign(launch, {
			flightNumber: latetsFlightNumber,
			customer: ["ZTM, NASA"],
			upcoming: true,
			success: true,
		})
	);
}

module.exports = {
	getAllLaunches,
	addNewLaunch,
};
