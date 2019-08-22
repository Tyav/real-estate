const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');
const savedPropertiesQuery = require('../queries/saved.properties.listing.queries');

const SavedPropertiesController = () => {
	const savePropertyListing = async (req, res, next) => {
		try {
			const { id: user_id } = req.token;
			const { property_id } = req.body;

      const alreadyExists = await savedPropertiesQuery.find({
				user_id,
				property_id
			});
			if (alreadyExists) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'property already saved by user',
						{},
						{ error: 'property already saved by user' }
					)
				);
			}

			const savedPropertyListing = await savedPropertiesQuery.create({
				user_id,
				property_id
			});

			return res.json(sendResponse(httpStatus.OK, 'success', {}, null));
		} catch (error) {
			next(error);
		}
	};

	return {
		savePropertyListing
	};
};

module.exports = SavedPropertiesController;
