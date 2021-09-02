const express = require("express");
const routes = express.Router();
const multer = require("multer");

const UsuarioController = require("../controllers/UsuarioController");

// Configurando o save da imagem

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './fotos/'); // Falando onde vai guardar a imagem
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Guardando o nome do arquivo
    }
})

const filefilter = (req, file, cb) => {
    // Verificando se e jpeg ou png o arquivo, se for ele salva, se não retorna erro
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error("Imagem não salva, por favor tente novamente"), false);
    }
}

let upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // }, Limitar o tamanho do arquivo salvo
    fileFilter: filefilter
});

routes.get("/", UsuarioController.list);
routes.get("/:id", UsuarioController.listOne);
routes.get("/instrumento/:instrumento_id", UsuarioController.listByInstrumento);
routes.get("/foto/:id", UsuarioController.foto);
routes.put("/:id", UsuarioController.update);
routes.post("/", upload.single("foto"), UsuarioController.create);
routes.delete("/:id", UsuarioController.deleteOne);

module.exports = routes; 