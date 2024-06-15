import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create model
const csvModel = mongoose.model('uploadedCsvFiles', csvSchema);
export default csvModel;