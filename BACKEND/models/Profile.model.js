const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
    },
    education :{
        type : String,
    },
    skills :[String],
    projects : [{
        title: {
            type :String,
            required : true,
        },
        description :{
            type : String,
            default : ""
        },
        links :{
            type : String,
            default: ""
        }
    }],
    works : [String],
    links : {
        github : String,
        linkedIn : String,
        portfolio : String,
    }

})

const ProfileModel = mongoose.model('Profile',ProfileSchema)

module.exports = ProfileModel;