const express = require("express");
const {getAllPassengers,passengersById,driversNearby}=require("./controllers")


const router = express.Router();

router.get("/",getAllPassengers);
router.get("/:id",passengersById);
router.get("/Driversnearby/:id",driversNearby);

module.exports=router;