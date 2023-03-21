const handleResponse = require("../../utlis/handleResponse");
const { getAllDrivers, getDriversAvailable,
    getDriversNearby, getDriversById } = require("../../services/drivers")

//*Para obtener una lista de todos los drivers
const listAllDrivers = async (req, res) => {
    try {
        const dataResponse = await getAllDrivers();
        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode});
    } catch (error) {
        handleResponse.error({res:res, error:"Unexpected Error", status:500, detailsError:error})

    }
};

//*Para obtener una lista de los drivers disponible
const listDriversAvailable = async (req, res) => {
   
    try {
        const dataResponse = await getDriversAvailable();

        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode})
    } catch (error) {
        handleResponse.error({res:res, errorMessage:"Unexpected Error", status:500, detailsError:error})
    }
}

//*Para obtener una lista de los drivers cercano a 3km
const listDriversNearby = async (req, res) => {
    try {
        const { longitude, latitude } = req.params;
        const dataResponse = await getDriversNearby({ longitude: parseFloat(longitude), latitude: parseFloat(latitude) });
        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode});
    } catch (error) {
        handleResponse.error({res:res, errorMessage:"Unexpected Error", status:500, detailsError:error});
    }
}

//*Obtener el drivers por su _id
const driversById = async (req, res) => {
    try {
        const { id } = req.params;
        const dataResponse = await getDriversById({_id:id});
        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode});
    } catch (error) {
        handleResponse.error({res:res, errorMessage:"Unexpected Error", status:500, detailsError:error});
    }
}



module.exports = {
    listAllDrivers,
    listDriversAvailable,
    listDriversNearby,
    driversById

}