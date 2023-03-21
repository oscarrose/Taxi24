const { modelTravels, modelPilots,modelInvoices } = require("../apiComponents/travels/model");
const { modelDrivers } = require("../apiComponents/drivers/model");

/**
 **[POST] nuevo travel
 *
 * @param { driverId, pilotrId, startTime, startingPoint, destination }
 * @return {object{data,status}} 
 */
const newTravel = async ({ driverId, pilotId, startingPoint, destination }) => {


    //* Verificar si tanto el conductor como el piloto existen en nuestra base de datos
    const [driver, pilot] = await Promise.all([modelDrivers.findById(driverId), modelPilots.findById(pilotId)]);


    if (!driver) {
        return {
            data: null,
            message: "Driver not found",
            statusCode: 404
        };
    }

    if (!pilot) {
        return {
            data: null,
            message: "Pilot not found",
            statusCode: 404
        };
    }

    //* Verificar si  el conductor están disponibles
    if (!driver.available) {
        return {
            data: null,
            message: "The driver is not available to ride",
            statusCode: 400
        };
    }
    //* Verificar si el piloto están disponibles
    if (!pilot.available) {
        return {
            data: null,
            message: "the pilot is not available to travel",
            statusCode: 400
        };
    }
    //* Crear una nueva instancia de Travels en la base de datos
    const travelsNew = new modelTravels({
        driver: driverId,
        pilot: pilotId,
        startingPoint: startingPoint,
        destination: destination
    });

    return {
        data: await travelsNew.save(),
        message: "Saved successfully",
        statusCode: 201
    };
}


/**
 **Funcion para calcular la distancia entre dos puntos 
 *? Si tiene dudas sobre como se realizo el calculo, se utilizo la Fórmula del Haversine
 **Link de expplicacion de la formula https://www.genbeta.com/desarrollo/como-calcular-la-distancia-entre-dos-puntos-geograficos-en-c-formula-de-haversine
 * @param {*} startingPoint
 * @param {*} destination
 * @return {*} 
 */
function calculateDistance(startingPoint, destination) {
    const earthRadius = 6371; // radio de la tierra en kilómetros

    const latDiff = (destination.coordinates[1] - startingPoint.coordinates[1]) * (Math.PI / 180);
    const lngDiff = (destination.coordinates[0] - startingPoint.coordinates[0]) * (Math.PI / 180);
    const lat1 = startingPoint.coordinates[1] * (Math.PI / 180);
    const lat2 = destination.coordinates[1] * (Math.PI / 180);
    const a =
        Math.sin(latDiff / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDiff / 2) ** 2;

    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * d;
}

/**
 **Funcion para calcular el costo del viaje 
 **Se pueden tomar varios factores para calcular el costo como es la taria del drivers, pilots, etc 
 **en este caso solo consideramos la distancia y el tiempo tomado en realizar el travels.
 *! Tarifa fija por kilómetro =1.5
 *! Tarifa por minuto 0.25
 * @param {*} distance
 * @param {*} timeTaken
 * @return {*} 
 */
function calculateCost(distance, timeTaken) {
    const RATE_PER_KM = 1.5;
    const RATE_PER_MINUTE=0.08;
    const distanceCost = distance * RATE_PER_KM;
    const timeCost = timeTaken * RATE_PER_MINUTE;
    const totalCost = distanceCost + timeCost;
    return totalCost.toFixed(2);
}

/**
 **[PACTH] completed travals
 *
 * @param {*} startingPoint
 * @param {*} destination
 *  @return {object{data,message,status}} 
 */
const completedTravels = async ({ travelId, paymentMethod }) => {


    //* buscamos el travel
    const foundTravel = await modelTravels.findById(travelId);

    //*verificamos si existe el travel
    if (!foundTravel) {
        return {
            data: null,
            message: "Travel not found",
            statusCode: 404
        }
    };

    //*we check if it is not finished
    if (foundTravel.status === 'finished') {
        return {
            data: null,
            message: "The journey has already been completed",
            statusCode: 400
        };
    }

    //* cambiamos de estado el travel a finished
    const travelsFisnished = await modelTravels.findByIdAndUpdate(
        foundTravel.id,
        {
            $set: {
                status: 'finished',
                endTime: Date.now()
            },
        }, {
        new: true,
    }
    );

    //*Recursos necesarios para generar factura
    const { startingPoint, destination } = travelsFisnished;

    const distance = calculateDistance(startingPoint, destination);

    const timeTaken = (travelsFisnished.endTime - travelsFisnished.startTime) / (1000 * 60); //! en minutos

    const costTravel = calculateCost(distance, timeTaken);


    //*Maperar los datos para crear la factura
    const invoiceTravel = new modelInvoices({
        travel: travelsFisnished._id,
        amount: costTravel,
        paymentMethod:paymentMethod,
        status: paymentMethod === "cash" ? "paid" : "pending"
    });
    await invoiceTravel.save();

    return {
        data: invoiceTravel,
        message: "Travel completed and invoice generated",
        status: 200
    };

}

/**
 **Funcion para obtener los viajes activos
 ** Asumi que los viajes activos seran los que estan en el [status in progress]
 * @return {*} 
 */
const activeTravels = async () => {

    const foundTravelsActive = await modelTravels.find({ status: 'in progress' });

    if (!foundTravelsActive.length) {

        return {
            data: null,
            message: "No active trip so far",
            statusCode: 404
        }
    }
    return {

        statusCode: 200,
        data: foundTravelsActive,
        message: "found successfully"

    }

}
module.exports = {
    newTravel,
    completedTravels,
    activeTravels
}