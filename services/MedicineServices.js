const Medicine=require("../models/MedicineModel")


//add medicine
exports.addMedcine=async(medicineData,pharmacistId)=>{
    const {name,description,image,category,price,stock,expiryDate}=medicineData;
    if(!name || !category){
        throw new Error ("name and category are required")
    }
    const medicine=new Medicine({
        name,
        description,
        image,
        category,
        price,
        stock,
        expiryDate,
        // addedBy:pharmacistId,
});


//save medicine to the database

await medicine.save()
console.log("Medicine saved:", medicine);
return medicine;

}
// edit medicince

exports.editMedicine=async (medicineId,updatedData)=>{
    const medicine=await Medicine.findById(medicineId);
    if(!medicine){
        throw new Error("Medicine not found")
    }
   Object.keys(updatedData).forEach((key)=>{
    medicine[key]=updatedData[key]

   }
   )
   await medicine.save();
   return medicine

}

exports.deleteMedicine= async(medicineId)=>{
    const deletedMedicine=await Medicine.findByIdAndDelete(medicineId);
    if(!deletedMedicine){
        throw new Error("Medicine not found")
    }
return deletedMedicine;
}

