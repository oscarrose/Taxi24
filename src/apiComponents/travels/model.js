const mongoose = require('mongoose')

const schema = mongoose.Schema;

//we create the scheme
const pilotsSchema = schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    licenseType: {
        type: String,
        enum: ['Categoria 01', 'Categoria 02', 'Categoria 03'],
        required: true
    },
    licenseNumber: { type: String, required: true, unique: true },
    available: { type: Boolean, default: true },
    createdAt: {
        date: { type: Date, default: Date.now },
    },

});
const travelsSchema = schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drivers',
        required: true
    },
    pilot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pilots',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'finished'],
        default: 'pending'
    },

    startTime: {//*Asumamos que el viaje inicie cuando sea creado, tambien puede ser cuando este in progress que inicie
        type: Date, default: Date.now
    },

    endTime: {
        type: Date, validate: {
            validator: function (v) {
                return v >= this.startTime;
            },
            message: 'End time should be later than start time'
        }
    },
    startingPoint: {
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
    destination: {
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
    createdAt: {
        date: { type: Date, default: Date.now },
    },

});

const invoicesSchema = schema({

    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'travels',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit card', 'debit card'],
        default: 'cash' //*Supongamos que el metodo de pago por defecto sea en efectivo
    },
    status: {
        type: String,
        enum: ['pending', 'paid'],//*Si es por credit card=pending, cash=paid
        default: 'paid'
    },
    date: {
        type: Date,
        default: Date.now
    }
});


//*En la base de datos para guardar el esquema que creamos
const modelPilots = mongoose.model('pilots', pilotsSchema)
const modelTravels = mongoose.model('travels', travelsSchema)
const modelInvoices = mongoose.model('invoices', invoicesSchema)
module.exports = {
    modelPilots,
    modelTravels,
    modelInvoices
};