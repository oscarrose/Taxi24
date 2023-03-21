const mongoose = require('mongoose')

const schema = mongoose.Schema;

//*creando el schema de la coleccion passengers
const passengersSchema = schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'debit card', 'cash'],
        required: true,
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    createdAt: { type: Date, default: Date.now },

});


//*Para guardar el esquema que creamos
const modelPassengers = mongoose.model('passengers', passengersSchema)

module.exports = {modelPassengers};