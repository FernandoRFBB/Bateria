const Login = require("../models/Login");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
    try {
        if (req.session.usuario_id == null && req.session.escola_id == null) {
            return res.status(403).json({message: "Não logado"});
        }

        const { nome, email } = req.body;
        
        // verificar se ja existe o email
        const exists = await Login.findOne({
            where: {email}
        });
        
        if (exists != null) {
            return res.status(402).json({message: "Email já existe"});
        }

        const senha = await bcrypt.hash(req.body.senha, 10);
        const usuario = await Login.create({ nome, email, senha, escola_id: req.session.escola_id })

        // Se for o primeiro usuario a ser registrado
        if (req.session.usuario_id == null) {
            req.session.usuario_id = usuario.id;
        }

        return res.status(200).json({
            usuario,
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
        }
        const usuario = await Login.findAll({
            where: {
                escola_id: req.session.escola_id
            }
        })
        return res.status(200).json({
            usuario,
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const isLogged = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
        } else {
            return res.status(200).json({message: "Logado"});
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const auth = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Login.findOne({
            where: {
                email: email
            }  
        })
        if (usuario == null) {
            return res.status(401).json({message: "Usuario inválido"});
        } else if (await bcrypt.compare(senha, usuario.senha)) {
            req.session.usuario_id = usuario.id;
            req.session.escola_id = usuario.escola_id;
            return res.status(200).json({message: "Bem vindo"})
        } else {
            return res.status(401).json({message: "Senha inválida"})
        };
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({message: "Sessão destruida"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    create,
    list,
    auth,
    logout,
    isLogged
}