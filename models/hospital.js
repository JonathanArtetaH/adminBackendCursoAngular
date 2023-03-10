const { Schema, model } = require('mongoose');

const hospitalShema = Schema({
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
}, {
    collection: 'hospitales'
});

hospitalShema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Hospital', hospitalShema);