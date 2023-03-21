const express = require("express");
const { listAllDrivers, listDriversAvailable,
    listDriversNearby,driversById } = require("./controllers");
    
//* use the router
const router = express.Router();

router.get("/", listAllDrivers);
router.get("/available", listDriversAvailable);
router.get("/:id", driversById);
router.get("/available/nearby/:longitude/:latitude", listDriversNearby);

module.exports = router;