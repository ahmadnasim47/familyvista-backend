
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB" ).then(() => {
    console.log('Connncetion Successfull')
}).catch((err) => console.log("no Connection"));








