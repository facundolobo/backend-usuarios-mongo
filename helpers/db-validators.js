
// models
const { 
    Proceso, 
    Usuario 
} = require('../models');



const Role = require('../models/role');


const esRoleValido = async(rol = '') =>{
                
    const existeRol = await Role.findOne({ rol }); //revisamos si el rol esta en la BD, usando el models 
    
    if( !existeRol ){
         
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async (correo = '') =>{
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        // return res.status(400).json({
        //     msg: `El correo ${correo} ya está registrado en la BD`
        // })
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
}

const procesoExiste = async (nombre = '') =>{
    const procesoExiste = await Proceso.findOne({nombre});
    if(procesoExiste){

        throw new Error(`El proceso ${nombre} ya está registrado en la BD`)
    }
}

const existeUsuarioPorId = async (id) =>{
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){

        throw new Error(`El id ${id} no existe`)
    }
}

const existeProcesoPorId = async (id) =>{
    //verificar si el correo existe
    const existeProceso = await Proceso.findById(id);
    if(!existeProceso){

        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeProcesoPorId,
    procesoExiste

}