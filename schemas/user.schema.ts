import mongoose from "mongoose";

const UserDocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
  },
  documentLocation: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  _userId: mongoose.Schema.Types.ObjectId,
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userCompletedProfile: {
    type: Boolean,
    required: true,
    default: false,
  },
  userAgreedToTerms: {
    type: Boolean,
    required: true,
  },
  userPersonalDetails: {
    userType: {
      type: String,
      required: false,
    },
    userFirstName: {
      type: String,
      required: false,
    },
    userLastName: {
      type: String,
      required: false,
    },
    userIdNumber: {
      type: Number,
      required: false,
    },
    userAge: {
      type: Number,
      required: false,
    },
    userGender: {
      type: String,
      required: false,
    },
    userEthnicity: {
      type: String,
      required: false,
    },
  },
  userBusinessDetails: {
    userBusinessName: {
      type: String,
      required: false,
    },
    userBusinessType: {
      type: String,
      required: false,
    },
    userBusinessRegistered: {
      type: Boolean,
      required: false,
      default: false,
    },
    userBusinessNumberOfEmployees: {
      type: Number,
      required: false,
    },
    userBusinessDocuments: {
      type: [UserDocumentSchema],
      required: false,
      default: [],
    },
  },
  userHandleDetails: {
    userWebsiteUrl: {
      type: String,
      required: false,
    },
    userFacebookPageUrl: {
      type: String,
      required: false,
    },
    userInstagramPageUrl: {
      type: String,
      required: false,
    },
    userYouTubeChannelUrl: {
      type: String,
      required: false,
    },
  },
  userBankDetails: {
    userAccountNumber: {
      type: Number,
      required: false,
    },
    userBankName: {
      type: String,
      required: false,
    },
    userBankBranchCode: {
      type: Number,
      required: false,
    },
  },
  userLocationDetails: {
    userStreetAddress: {
      type: String,
      required: false,
    },
    userSuburb: {
      type: String,
      required: false,
    },
    userWard: {
      type: String,
      required: false,
    },
    userCity: {
      type: String,
      required: false,
    },
    userAreaCode: {
      type: Number,
      required: false,
    },
    userProvince: {
      type: String,
      required: false,
    },
    userCountry: {
      type: String,
      required: false,
    },
  },
});

export default UserSchema;
