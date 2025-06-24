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
        select: false
    },
    avatar: {
        type: String,
        require:false,
        // Add gravatar as default
        default:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" ,
    },
});

userSchema.methods.comparePassword = async function (password) {
    return password === this.password;
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;