const { modelDrivers } = require("../apiComponents/drivers/model")

//** [GET] all drivers
const getAllDrivers = async () => {
    const Drivers = await modelDrivers.find({});

    if(!Drivers.length){
        return{
            data:null,
            message:"Not found",
            statusCode:404
        }
    }
    return {
        data: Drivers,
        statusCode: 200,
        message: "List the Drivers"
    };
}

//**[GET] the drivers available 
const getDriversAvailable = async () => {
    const availableDrivers = await modelDrivers.find({available:true});

    if(!availableDrivers.length){
        return{
            data: null,
            statusCode: 404,
            message: "Drivers not available"
        }
    }
    return{
        data: availableDrivers,
        statusCode: 200,
        message: "Drivers available"
    };
}

/*
*[GET] Drivers available within a 3km radius 
*/
const getDriversNearby = async ({ longitude, latitude }) => {
    const nearbyDrivers = await modelDrivers.find({
        available: true,
        location: {
            $nearSphere: {
                $geometry: {
                    type: "point",
                    coordinates: [longitude, latitude]
                },
                $maxDistance: 3000 //* distance in meters
            }
        }
    })
    if (!nearbyDrivers.length) {
        return {
            data: null,
            statusCode: 404,
            message: "Drivers available nearby not found"
        }
    }
    return {
        data: nearbyDrivers,
        statusCode: 200,
        message: "Drivers available nearby in 3km"
    };
}
/*
 * [GET] a specific driver by ID
*/
const getDriversById = async ({ _id }) => {

    const foundDrivers = await modelDrivers.findById(_id);

    if (!foundDrivers) {
        return {
            message:"Drivers not found",
            data:null,
            statusCode: 404
        }
    }
    return {
        message:"Drivers found",
        statusCode: 200,
        data: foundDrivers
    }

}

module.exports = {
    getAllDrivers,
    getDriversAvailable,
    getDriversNearby,
    getDriversById
}