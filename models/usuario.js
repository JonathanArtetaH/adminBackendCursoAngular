const { Schema, model } = require('mongoose');

const usuarioShema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'User_Role'
    },
    google: {
        type: Boolean,
        default: false
    },
});

usuarioShema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.Oid = _id;

    return object;
});


module.exports = model('Usuario', usuarioShema);