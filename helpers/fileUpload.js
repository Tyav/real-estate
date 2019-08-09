const { uploader } = require('../config/cloudinaryConfig');
const Datauri = require('datauri');
const path = require('path');

const uploadFile = async (req, res) => {
	console.log('now here');
	// console.log(req.files, Object.keys(req.files));

	try {
		if (Object.keys(req.files).length == 0) {
			return res.status(400).send('No files were provided.');
		}
	} catch (error) {
		return res.status(400).send('No files were provided.');
	}
	let fileName;
	let successfulCount = 0;
	let overallMessage = [];
	let overallObject = {};
	for (let property in req.files) {
		fileName = property;
		console.log(fileName);

		const dUri = new Datauri();
		const dataUri = req =>
			dUri.format(
				path.extname(req.files[fileName].name),
				req.files[fileName].data
			);

		const file = dataUri(req).content;
		await uploader
			.upload(file)
			.then(result => {
				const image = result.url;
				successfulCount += 1;
				overallMessage.push(
					`${req.files[property].name} has been uploaded successfully to cloudinary `
				);
				overallObject[fileName] = { image };
				// return res.status(200).json({
				// 	message: `${} image(s) has been uploaded successfully to cloudinary`,
				// 	data: { image }
				// });
			})
			.catch(err => {
				overallMessage.push(
					`${req.files[property].name} was not uploaded successfully to cloudinary `
				);
				overallObject[fileName] = { err };
				// return res.status(400).json({
				// 	message: 'someting went wrong while processing your request',
				// 	data: { err }
				// })
			});
	}
	if(successfulCount > 0){
		return res.status(200).json({
			message: overallMessage,
			data: overallObject
		});
	}
	else{
		return res.status(200).json({
			message: "No file was uploaded",
			data: overallObject
		});
	}
	
};

module.exports = uploadFile;
