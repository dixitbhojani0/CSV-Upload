import csvModel from "../models/uploadedCsvFiles.js";

export const homePage = async (req, res) => {
    const CSVFiles = await csvModel.find({});

    res.render('home', {
        title: 'CSV Upload | Home',
        files: CSVFiles
    });
}