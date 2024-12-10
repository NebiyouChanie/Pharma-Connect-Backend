const PharmacistServices=require("../services/PharmacistServices");


//add medicine controller

exports.addMedicineController= async(req,res)=>{
    try {
        const newMedicine =await PharmacistServices.addMedcine(req.body)
        res.status(201).json({
            success: true,
            message:"medicine created successfully!",
           
        })
    } catch (error) {
        console.log("file: PharmacistController.js:5 ~ exports.Usercontroller= ~ error:", error.message)
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    } 
}

