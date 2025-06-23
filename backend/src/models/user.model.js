import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require:false,
        // Add gravatar as default
        default:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" ,
    },
});


const userModel = mongoose.model("userModel", userSchema);

export default userModel;