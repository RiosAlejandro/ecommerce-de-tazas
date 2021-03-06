const fs = require('fs');

function recordameMiddleware (req, res, next){
    if(req.cookies.recordame != undefined && req.session.usuarioALoguearse == undefined){
        let archivoUsuario = fs.readFileSync("./public/data/usuarios.json", { encoding: 'utf-8' });
            let usuarios;
            
            if (archivoUsuario == "") {
                usuarios = [];
            }else {
                usuarios = JSON.parse(archivoUsuario);
            }
            let usuarioALoguearse;

            for(let i = 0; i < usuarios.length; i++) {
                if(usuarios[i].email == req.cookies.recordame){
                        usuarioALoguearse = usuarios[i];
                        break;
                }
            }
            req.session.usuarioLogueado = usuarioALoguearse;
    };
    
    next();
}
module.exports = recordameMiddleware;