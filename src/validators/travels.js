const { check } = require('express-validator');
const { validateResult } = require('../utlis/handleValidators')
const validteCreateTravels = [
    check('driverId', 'The driver is required')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('pilotId', 'The pilot is required')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('startingPoint', 'Must specify the starting location')
        .exists()
        .not()
        .isEmpty()
        .isObject(),
    check('destination', 'The destination of the trip must be specified')
        .exists()
        .not()
        .isEmpty()
        .isObject(),
    (req, res, next) => {
        validateResult({ req: req, res: res, next: next })
    }
]
const validatePaymentMethod = [
    check('paymentMethod', 'The payment method is required')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    (req, res, next) => {
        validateResult({ req: req, res: res, next: next })
    }
]

module.exports = { validteCreateTravels, validatePaymentMethod };