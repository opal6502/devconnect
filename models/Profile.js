const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubUsername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      major: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: false,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
