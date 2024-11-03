const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();

    next();
});


userSchema.methods.comparePassword = async function(password) {
    return password == this.password
}


const User = mongoose.model("User", userSchema);

module.exports = User;
