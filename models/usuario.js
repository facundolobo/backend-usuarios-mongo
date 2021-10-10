const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }, 

    estado:{
        type: Boolean,
        default: true
    },

})
//funcion para extraer y quitar los atributos q no quiero q se devuelvan 
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();    
    
    //cambiar nombre de variable id 
    
    usuario.uid= _id;
    //--

    return usuario;
}


module.exports = model('Usuario' , UsuarioSchema)