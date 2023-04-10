const mongoose = require("mongoose")

function connecrDB(){
    mongoose.connect('mongodb+srv://admin:admin@cluster0.cyjvs.mongodb.net/DrivingSchool', {useUnifiedTopology: true, useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected', ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error', ()=>{
        console.log('Mongo DB Connection Error')
    })
}

connecrDB()

module.exports = mongoose