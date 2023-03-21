const {modelPassengers} = require("../apiComponents/passengers/model");
const {modelDrivers} = require("../apiComponents/drivers/model");


/**
**[GET] Todos los passengers
 * @return {*}list passengers 
 */
const fetchPassengers = async () => {

    const passengers = await modelPassengers.find({})
    if (!passengers.length) {
        return {
            data: passengers,
            message: "Not found",
            statusCode: 404
        }
    }
    return {
        data: passengers,
        message: "Passengers list",
        statusCode: 200
    };
}

/**
 **[GET] Obtener passengers by id
 * @param {*} id
 * @return {*} one passenger
 */
const getPassengersById = async (id) => {
    const Passenger = await modelPassengers.findById(id);

    if (!Passenger) {
        return {
            message: "Passengers not found",
            data: null,
            statusCode: 404
        }
    }
    return {
        statusCode: 200,
        data: Passenger,
        message: "Passengers found successfully"
    }
}

/**
 **[GET] Obtener los 3 conductores más cercanos al punto de partida del passengers
 **Asumo que la distancia de  los drivers mas cercana es de 1km
 * @param {*} {passengersId}
 * @return {*} List the Drivers
 */
const MAX_DISTANCE_IN_METERS = 1000;
const LIMIT_DRIVERS_NEARBY = 3;
const findNearbyDrivers = async ({ passengerId }) => {
    try {
        const foundPassenger = await modelPassengers.findById(passengerId);
        if (!foundPassenger) {
            return {
                statusCode: 404,
                message: "Passenger not found",
                data: null
            }
        }

        const driversNearby = await modelDrivers.find({
            available: true,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: foundPassenger.currentLocation.coordinates,
                    },
                    $maxDistance: MAX_DISTANCE_IN_METERS,
                },
            },
        }).limit(LIMIT_DRIVERS_NEARBY);

        if (!driversNearby.length) {
            return {
                statusCode: 404,
                message: "Nearby drivers not found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Drivers found successfully",
            data: driversNearby
        };
    } catch (error) {
        return {
            statusCode: 404,
            message: error.message,
            data: null
        };
    }
};


module.exports = {
    fetchPassengers,
    getPassengersById,
    findNearbyDrivers
}