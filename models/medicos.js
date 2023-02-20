const { Schema, model } = require('mongoose');

const medicoshema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    activo: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
}, {
    collection: 'medicos'
});

medicoshema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Medicos', medicoshema);