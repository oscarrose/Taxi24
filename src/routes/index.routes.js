const express=require("express");
const drivers=require("../apiComponents/drivers/routes");
const travels=require("../apiComponents/travels/routes");
const passengers=require("../apiComponents/passengers/routes");
const router=express.Router();

router.use("/api/drivers",drivers);
router.use("/api/travels",travels);
router.use("/api/passengers",passengers);


module.exports=router;