const { Schema, model } = require('mongoose');

const medicoShema = Schema({
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

medicoShema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

global.medicoShema = global.medicoShema || model('Medico', medicoShema);

module.exports = global.medicoShema;