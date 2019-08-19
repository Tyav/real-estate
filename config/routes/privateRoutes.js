const { celebrate: validate } = require('celebrate');
const paramValidation = require('../../api/validations/category.validation');
const UserIdValidation = require('../../api/validations/user.category.validation');
const IsAdmin = require('../../api/middlewares/IsAdmin');
const IsInvestor = require('../../api/middlewares/IsInvestor');
const getCategories = require('../../helpers/categories');
const profileValidation = require('../../api/validations/agencyProfile.valiation');
const isSelllerMiddleware = require('../../api/middlewares/isSellerMiddleware');
const hasCreatedProfile = require('../../api/middlewares/hasCreatedProfile');
const uploadFile = require('../../api/middlewares/fileUpload');

const privateRoutes = {
  'GET /users': {
    path: 'UserController.getAll',
    middlewares: [IsAdmin]
  },
  'GET /agency-profiles': {
    path: 'AgencyProfileController.getAllProfiles',
    middlewares: [IsAdmin]
  },

  'POST /create-profile': {
		path: 'AgencyProfileController.createProfile',
		middlewares: [validate(profileValidation.createProfile, { abortEarly: false }), isSelllerMiddleware, hasCreatedProfile, uploadFile],
	},

  'GET /categories': 'CategoryController.getAll',

  'GET /user-category/:id': {
    path: 'UserCategoryController.getAll',
    middlewares: [validate(UserIdValidation.validateUserId, { abortEarly: false }), IsInvestor]
  },

  'POST /category': {
    path: 'CategoryController.create',
    middlewares: [validate(paramValidation.createCategory, { abortEarly: false }), IsAdmin]
  },

  'POST /select-category': {
    path: 'UserCategoryController.create',
    middlewares: [
      validate(paramValidation.createCategory, { abortEarly: false }),
      IsInvestor,
      getCategories
    ]
  },

  'POST /approve-profile/:id': {
    path: 'AgencyProfileController.approveProfile',
    middlewares: [validate(UserIdValidation.validateUserId, { abortEarly: false }), IsAdmin]
  }
};

module.exports = privateRoutes;
