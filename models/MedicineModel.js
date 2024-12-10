const mongoose=require("mongoose");

const MedicineSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Medicine category is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: 0,
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required'],
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the pharmacist who added the medicine
        required: true,
    },
    
})
const Medicine = mongoose.model('Medicine', MedicineSchema)

module.exports = Medicine;
