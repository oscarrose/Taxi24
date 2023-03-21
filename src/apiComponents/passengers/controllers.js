const handleResponse = require("../../utlis/handleResponse");
const { fetchPassengers, getPassengersById,
    findNearbyDrivers } = require("../../services/passengers")


/**
 **Para obtener toda una lista de todos los passengers
 * @param {*} req
 * @param {*} res
 */
const getAllPassengers = async (req, res) => {
    try {
        const dataResponse = await fetchPassengers();
        handleResponse.success({ req: req, res: res, dataResponse: dataResponse.data, message:dataResponse.message,status: dataResponse.statusCode })
    } catch (error) {
        handleResponse.error({ res: res, errorMessage: "Unexpected Error", status: dataResponse.statusCode, detailsError: error })
    }
}

/**
 **Para obtener un passengers especifico por su id
 *
 * @param {*} req
 * @param {*} res
 */
const passengersById = async (req, res) => {
    try {
        const { id } = req.params;
        const dataResponse = await getPassengersById(id);
        handleResponse.success({ req: req, res: res, dataResponse: dataResponse.data, message:dataResponse.message,status: dataResponse.statusCode})
    } catch (error) {
        handleResponse.error({ res: res, errorMessage: "Unexpected Error", status: 500, detailsError: error })
    }
}

const driversNearby=async(req, res)=>{
    try {
       const { id } = req.params;
        const dataResponse = await findNearbyDrivers({passengerId:id});
        handleResponse.success({ req: req, res: res, dataResponse: dataResponse.data,message:dataResponse.message, status: dataResponse.statusCode})
    } catch (error) {
        handleResponse.error({ res: res, errorMessage: "Unexpected Error", status: 500, detailsError: error })
    }
}

module.exports = {
    getAllPassengers,
    passengersById,
    driversNearby
}