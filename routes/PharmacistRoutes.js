const express = require('express');
const router = express.Router();
const PharmacistController=require("../controller/PharmacistController") 



// medicine management
router.post('/Medicine/add',PharmacistController.addMedicineController);

router.post('/Medicine/edit',PharmacistController.editMedicineDetailController);

router.delete("/Medicine/:medicineId/delete",PharmacistController.deleteMedicineController);




// //profile management
// router.get("/profile",PharmacistController.getProfileController);
// router.put('/profile/update', PharmacistController.updateProfileController); 
// router.put('/profile/changePassword', PharmacistController.changePasswordController); 

// //stock-related routes

// router.get('/Medcine/list', PharmacistController.getAllMedicinesController);
// router.get('/Medicine/lowStock',PharmacistController.getLowStockMedicinesController);// Fetch medicines with low stock




module.exports = router