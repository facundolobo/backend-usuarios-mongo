const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario'); //importo el mdoelo
const { generarJWT } = require('../helpers/generar-jwt');

//obtener todos los usuarios
const usuariosGet = async(req = request, res = response) => {
    
    // const {q, nombre='no name', apikey} = req.query; //obtener los aprametros opcionales 
    const { limite = 5, desde=0} = req.query; //obtiene el limite de los query enviados
   
    const query = {estado : true}

    //esto me permite mandar un arreglo con todas las promesas que quiero q se ejecuten
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number ( desde ))
            .limit(Number (limite)) //por si envian un limite 
    ]);

    res.json({
        total,
        usuarios
    })
}
//registrar usuario
const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password} = req.body; //obtenemos los datos que se envian    

    
        try{
 
            //grabar en BBDD

            let usuario=new Usuario({nombre, correo, password})

                //encriptar contraseña
                const salt = bcryptjs.genSaltSync();

                usuario.password = bcryptjs.hashSync( password, salt ); //reescribimos el password
                //--

                await usuario.save();
                //generar nuestro JWT
                const token = await generarJWT(usuario.uid, usuario.nombre);
            //--
        
        res.status(201).json({ //devolvera esto            
            ok: true,
            usuario,
            token
           
        })
    }catch(error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            })
        }
}
//actualziar usuario
const usuariosPut = async(req, res = response) => {
    
    const { id } = req.params; //obenemos el id enviado desde url
    const { _id, password, google, ...resto } = req.body;


    //TODO validar contra base de datos
    if(password){
    
        const salt = bcryptjs.genSaltSync(); //para la cantidad de veces q se encriptara , pro def son 10
        resto.password = bcryptjs.hashSync( password, salt ); //volvemos a serializar el password
                
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto , {new: true});

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'patch API - controlador'
    })
}
//aliminar usuario
const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    
    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    //borrar logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    // const usuarioAutenticado = req.usuario;  //obtenemos los datos de req

    res.json({
        usuario 
    })
}


module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}