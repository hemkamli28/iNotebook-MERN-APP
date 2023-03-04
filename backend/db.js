const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://hem28:hem28102002@inotebook-cluster.vkrd6d5.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected successfully");
    })
}

module.exports = connectToMongo;