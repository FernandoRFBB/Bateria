const { Op } = require('sequelize');
const { sequelize } = require('../models/Usuario');
const Usuario = require('../models/Usuario');

const create = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }

        const { nome, cpf, telefone,
                tam_camisa, tam_calca,
                tam_calcado, diretor, 
                instrumento_id } = req.body;
        const foto = escola_id + '_' + nome;
        const usuario = await Usuario.create({
            nome,
            cpf,
            telefone,
            tam_camisa,
            tam_calca,
            tam_calcado,
            diretor,
            escola_id: req.session.escola_id,
            instrumento_id: instrumento_id,
            foto
        });
        
        return res.status(200).json({
            usuario,
        });
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        
        const usuarios = await Usuario.findAll({
            where: { escola_id: req.session.escola_id }
        });
        if (usuarios != 0) {
            return res.status(200).json({
                usuarios,
            });
        }

        return res.status(200).json({message: "A escola não tem pessoas"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const listByInstrumento = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }

        const { instrumento_id } = req.params;

        const usuarios = await Usuario.findAll({
            where: {[Op.and]: [
                { instrumento_id: instrumento_id }, { escola_id: req.session.escola_id }
            ]}
        });

        return res.status(200).json({
            usuarios
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const listOne = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.statu(550).json({message: "Não logado"});
        }
        const { id } = req.params;

        const usuario = await Usuario.findAll({
            where: {[Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });
        if (usuario != 0) {
            return res.status(200).json({
                usuario,
            });
        }
        return res.status(553).json({message: "Pessoa não existe"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        const { id } = req.params;
        const { nome, cpf,  telefone,
            tam_camisa, tam_calca,
            tam_calcado, diretor,
            instrumento_id, foto } = req.body;

        const updated = await Usuario.update({
            nome,
            cpf,
            telefone,
            tam_camisa,
            tam_calca,
            tam_calcado,
            diretor,
            instrumento_id,
            foto
        }, {
            where: { [Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });

        if (updated != 0) {
            const usuario = await Usuario.findByPk(id);
            return res.status(200).json({
                usuario
            })
        }
        return res.status(553).json({message: "Pessoa não existe"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteOne = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        const { id } = req.params;

        const deleted = await Usuario.destroy({
            where: { [Op.and]: [
                { id: id },
                { escola_id: req.session.escola_id }
            ]}
        });

        if (deleted) {
            return res.status(200).json({
                message: "Deletado com sucesso"
            })
        }
        return res.status(553).json({message: "Pessoa não existe"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}



module.exports = {
    create,
    list,
    listOne,
    update,
    deleteOne,
    listByInstrumento
}

