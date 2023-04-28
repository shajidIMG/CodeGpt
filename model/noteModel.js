const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    imgUrl:{
        type:String,
    },
    description:{
        type:String,
    },
  createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model('img',userSchema)