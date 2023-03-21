const express = require("express");
const {createNewTravel,finishedTravels,listTravelsActive} = require("./controllers");
const {validteCreateTravels,validatePaymentMethod}=require("../../validators/travels");
// use the router
const router = express.Router();
router.post("/", validteCreateTravels,createNewTravel);
router.patch("/:id",validatePaymentMethod,finishedTravels);
router.get("/active",listTravelsActive);

module.exports = router;