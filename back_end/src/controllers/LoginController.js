const Login = require("../models/Login");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
    try {
        const { nome, email, escola_id } = req.body;
        const senha = await bcrypt.hash(req.body.senha, 10);
        const usuario = await Login.create({ nome, email, senha, escola_id })
        return res.json({
            usuario,
        })
    } catch (error) {
        return res.json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.json({message: "Não logado", erro: 0});
        }
        const { escola_id } = req.body;
        const usuario = await Login.findAll({
            where: {
                escola_id: escola_id
            }
        })
        return res.json({
            usuario,
        })
    } catch (error) {
        return res.json({error: error.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Login.findOne({
            where: {
                email: email
            }  
        })
        if (usuario == null) {
            return res.json({message: "Usuario inválido", erro: 0});
        };
        if (await bcrypt.compare(senha, usuario.senha)) {
            req.session.usuario_id = usuario.id;
            req.session.escola_id = usuario.escola_id;
            return res.json({message: "Bem vindo"})
        } else {
            return res.json({message: "Senha inválida", erro: 1})
        };

    } catch (error) {
        return res.json({error: error.message});
    }
}

const isLogged = async (req, res) => {
    try {
        if (req.session.usuario_id) {
            return res.json({message: "Usuario já está logado", user: true});
        }
        return res.json({message: "Não tem login", user: false});
    } catch (error) {
        return res.json({error: error.message});
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.json({message: "Sessão destruida"})
    } catch (error) {
        return res.json({error: error.message});
    }
}

module.exports = {
    create,
    list,
    login,
    isLogged,
    logout
}