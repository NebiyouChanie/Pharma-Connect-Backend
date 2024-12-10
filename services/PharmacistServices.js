const Medicine=require("../models/MedicineModel")

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
    addedBy:pharmacistId,
});
//save medicine to the database

await medicine.save()
return medicine;
}
