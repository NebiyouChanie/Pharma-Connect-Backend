const Medicine = require("../models/MedicineModel");
const Pharmacy = require("../models/pharmacyModel");
const Inventory = require("../models/inventoryModel");
const customError = require('../utils/customError');

// Calculate distance function
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

exports.searchMedicine = async ({
  medicineName,
  userLatitude,
  userLongitude,
}) => {
  console.log(`Searching for medicine: "${medicineName}"`);
  
  // Find all medicines by name using a case-insensitive search
  const medicines = await Medicine.find({
    name: { $regex: medicineName, $options: "i" },
  });

  console.log(`Found ${medicines.length} medicines matching "${medicineName}":`, medicines.map(m => m.name));

  if (!medicines || medicines.length === 0) {
    throw new customError('Medicine not found.', 400);
  }

  // Get all medicine IDs
  const medicineIds = medicines.map(medicine => medicine._id);
  console.log(`Medicine IDs to search for:`, medicineIds);
  
  // Find all inventory items for all matching medicines
  let inventoryItems = await Inventory.find({ 
    medicine: { $in: medicineIds }
  }).populate("pharmacy").populate("medicine");
  
  console.log(`Found ${inventoryItems.length} inventory items`);
  
  // Debug: Check for null references
  const nullPharmacyCount = inventoryItems.filter(item => !item.pharmacy).length;
  const nullMedicineCount = inventoryItems.filter(item => !item.medicine).length;
  console.log(`Items with null pharmacy: ${nullPharmacyCount}`);
  console.log(`Items with null medicine: ${nullMedicineCount}`);
 
  // Transform results for response with null checks and distance calculation
  const result = inventoryItems
    .filter(item => {
      if (!item.pharmacy) {
        console.log(`Skipping inventory item ${item._id} - null pharmacy (database integrity issue)`);
        return false;
      }
      if (!item.medicine) {
        console.log(`Skipping inventory item ${item._id} - null medicine (database integrity issue)`);
        return false;
      }
      return true;
    })
    .map((item) => {
      const baseResult = {
        pharmacyName: item.pharmacy.name,
        address: item.pharmacy.address,
        photo: item.pharmacy.pharmacyImage,
        price: item.price,
        quantity: item.quantity,
        latitude: item.pharmacy.latitude,
        longitude: item.pharmacy.longitude,
        pharmacyId: item.pharmacy._id,
        inventoryId: item._id,
        medicineName: item.medicine.name, // Use the actual medicine name from the populated field
      };

      // Calculate distance and time if user location is provided
      if (userLatitude && userLongitude && item.pharmacy.latitude && item.pharmacy.longitude) {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          item.pharmacy.latitude,
          item.pharmacy.longitude
        );
        baseResult.distance = distance;
        baseResult.time = distance * 3; // 3 minutes per km
        console.log(`Distance to ${item.pharmacy.name}: ${distance.toFixed(2)} km`);
      } else {
        baseResult.distance = null;
        baseResult.time = null;
      }

      return baseResult;
    });
  
  console.log(`Search for "${medicineName}" found ${result.length} valid inventory items (filtered out ${inventoryItems.length - result.length} invalid items)`);
  return result;
};

 