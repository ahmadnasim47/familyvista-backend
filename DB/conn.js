
const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB" ).then(() => {
    console.log('Connncetion Successfull')
}).catch((err) => console.log("no Connection"));
