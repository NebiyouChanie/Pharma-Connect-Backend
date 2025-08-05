const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require('../utils/customError');
const searchServices = require('../services/searchServices');


exports.searchMedicineController = asyncErrorHandler(async(req, res) => {
    const { medicineName, userLatitude, userLongitude } = req.body;
    console.log("🚀 ~ req.body:", req.body)

    if (!medicineName) {
        throw new customError('Please provide a medicine name to search.', 400);
    }

    console.log("Search request received:", { medicineName, userLatitude, userLongitude });

    const results = await searchServices.searchMedicine({ 
        medicineName, 
        userLatitude, 
        userLongitude 
    });

    res.status(200).json({
        success: true,
        count: results.length,
        data: results,
    })
})