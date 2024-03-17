import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { uniqueId } from '../utils/index.js'

// lowercase -> para que lo ponga en minuscula
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true 
    },
    token: {
        type: String,
        default: () => uniqueId()
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

// encriptar el password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) { 
        // comprueba si la contraseña ya a sido encriptada y sigue al siguiente paso sin encriptar
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Comprobar los password
userSchema.methods.checkPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
