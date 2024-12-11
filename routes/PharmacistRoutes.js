const express = require('express');
const router = express.Router();
const PharmacyController=require("../controller/PharmacistController") 




router.post('/Medicine/add',PharmacyController.addMedicineController);


router.post('/Medicine/editDetails',PharmacyController.editMedicineDetailController);

router.delete("/Medicine/delete",PharmacyController.deleteMedicineController)


module.exports = router