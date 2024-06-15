import csvModel from "../models/uploadedCsvFiles.js";
import fs from "fs";
import papa from "papaparse";

//create and parse CSV
export const uploadFile = async (req, res) => {
    try {
        const csvFile = await csvModel.findOne({name:req.file.originalname});
        if(csvFile){
            req.flash('error', 'CSV already exists! 😧')
            return res.redirect('back');
        }

        //allowing only CSV input type
        if(req.file && req.file.mimetype == 'text/csv'){
            const newCsvFile = new csvModel({
                name: req.file.originalname,
                filePath: req.file.path
            });
            await newCsvFile.save();
            req.flash('success', 'CSV uploaded successfully 🤙');
            return res.redirect('back');
        } else {
            req.flash('error', 'only CSV file allowed');
            return res.redirect('back');
        }

    } catch (err) {
        //cathching errors and rendering common error page in the FE along with notification
        console.log("error", err);
        req.flash('error', 'something went wrong ☹️');
        return res.render('servererror', {title: 'CSV Upload | Server error'});
    }
}

//display CSV Data
export const displayCSV = async (req, res) => {
    try {
        const csvData = await csvModel.findById(req.params.id);
        if(!csvData) {
            req.flash('error', 'CSV not found ☹️');
            return res.status(404).render('404', {title: 'CSV Upload | CSV not found'});
        }

        //parsing CSV using papaparse
        const fetchCSVFile = fs.readFileSync(csvData.filePath, 'utf8');
        
        const parsedFileData = papa.parse(fetchCSVFile, { 
            header: false 
        });

        return res.render('table',{
            title: 'CSV Upload | Details',
            file: csvData.name,
            keys: parsedFileData.data[0],
            results: parsedFileData.data
        });
    } catch (err) {
        console.log("error", err);
        req.flash('error', 'something went wrong ☹️');
        return res.status(500).render('servererror', {title: 'CSV Upload | Server error'});
    }
}

//delete CSV from DB
export const deleteCSV = async (req, res) => {
    try {
        const csvData = await csvModel.findById(req.params.id);
        if(!csvData) {
            req.flash('error', 'CSV not found ☹️');
            return res.status(404).render('404', {title: 'CSV Upload | CSV not found'});
        }
        await csvModel.findByIdAndDelete(req.params.id);
        req.flash('success', 'CSV removed successfully 🤘');
        return res.redirect('back');
    } catch (err) {
        console.log("error", err);
        req.flash('error', 'something went wrong ☹️');
        return res.status(500).render('servererror', {title: 'CSV Upload | Server error'});
    }
}