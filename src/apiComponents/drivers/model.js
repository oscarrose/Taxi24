const mongoose = require('mongoose')

const schema = mongoose.Schema;

//*creando el schema de la coleccion drivers
const driversSchema = schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    available: { type: Boolean, default: true },
    createdAt: {
        date: { type: Date, default: Date.now }
    },
    
});

driversSchema.index({ location: "2dsphere" });


//*Para guardar el esquema que creamos
const modelDrivers = mongoose.model('drivers', driversSchema)

module.exports = {modelDrivers};