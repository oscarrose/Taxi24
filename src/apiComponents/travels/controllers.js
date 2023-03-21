const { newTravel, completedTravels,activeTravels } = require("../../services/travels")
const handleResponse = require("../../utlis/handleResponse");


//*Para crear un viaje
const createNewTravel = async (req, res) => {
   
    try {
        const { driverId, pilotId,startingPoint, destination } = req.body;
        const dataResponse = await newTravel({
            driverId: driverId, pilotId: pilotId, startingPoint: startingPoint,
            destination: destination
        });
        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode});
    } catch (error) {
        handleResponse.error({res:res, errorMessage:"Unexpected Error", status:500, detailsError:error})
    }
};

//*Para finalizar los viajes como completado
const finishedTravels = async (req, res) => {
    const {id}=req.params;
    const { paymentMethod}=req.body;
    try {
       const dataResponse=await completedTravels({travelId:id, paymentMethod: paymentMethod})
       handleResponse.success({req:req,res:res,dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.status})
    } catch (error) {
        handleResponse.error({res:res,errorMessage:"Unexpected Error",status:500,detailsError:error})
    }
}
//*Para obtener la lista de los viajes activos
const listTravelsActive=async(req,res)=>{
    try {
        const dataResponse = await activeTravels();
        handleResponse.success({req:req, res:res, dataResponse:dataResponse.data,message:dataResponse.message, status:dataResponse.statusCode});
    } catch (error) {
        handleResponse.error({res:res, errorMessage:"Unexpected Error", status:500,detailsError:error});
    }
}
module.exports = {
    createNewTravel,
    finishedTravels,
    listTravelsActive
}
