const Medicine = require("../models/MedicineModel");


//add medicine
exports.addMedcine=async(medicineData,pharmacistId)=>{
    const {name,description,image,category}=medicineData;

    const existingMedicine = await Medicine.findOne({name: name})
    if(existingMedicine){
        throw new Error ("Medicine already exists")
    }
    const medicine=new Medicine({
        name,
        description,
        image,
        category,
    });

    await medicine.save()
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


//delete medicine
exports.deleteMedicine= async(medicineId)=>{
    const deletedMedicine=await Medicine.findByIdAndDelete(medicineId);
    if(!deletedMedicine){
        throw new Error("Medicine not found")
    }
return deletedMedicine;
}




// List medicines
exports.listMedicine = async () => {
    const medicines = await Medicine.find(); // Fetch all medicines from the database
    if (medicines.length === 0) {
        throw new Error("No medicines found");
    }
    return medicines;
};


//get medicine
exports .getMedicineById=async(medicineId)=>{
    const medicine=await Medicine.findById(medicineId)
    if(!medicine){
        throw new Error("Medicine not found")
    }
    return medicine;
}

// Get medicine suggestions
exports.getMedicineSuggestions = async (query) => {
    console.log("Suggestions service called with query:", query);
    
    const medicines = await Medicine.find({
        name: { $regex: query, $options: "i" }
    })
    .select('name category')
    .limit(10) // Limit to 10 suggestions
    .sort({ name: 1 }); // Sort alphabetically
    
    console.log(`Found ${medicines.length} medicines for query "${query}"`);
    console.log("Medicines:", medicines.map(m => ({ name: m.name, category: m.category })));
    
    return medicines;
};
