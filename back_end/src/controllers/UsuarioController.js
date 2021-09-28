const { Op } = require('sequelize');
const { sequelize } = require('../models/Usuario');
const Usuario = require('../models/Usuario');
const fs = require('fs');
const path = require('path');

const create = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
        }

        const { nome, cpf, telefone,
                tam_camisa, tam_calca,
                tam_calcado, diretor, 
                instrumento_id } = req.body;
        const usuario = await Usuario.create({
            nome,
            cpf,
            telefone,
            tam_camisa,
            tam_calca,
            tam_calcado,
            diretor,
            escola_id: req.session.escola_id,
            instrumento_id,
        });

        if (req.file) {
            // colocando o campo foto como o id.jpeg
            usuario.foto = usuario.id + ".jpeg"
            await usuario.save();

            // renomeando o nome do arquivo padrão para o id.jpeg
            await fs.rename('./fotos/' + req.file.filename, './fotos/' + usuario.id + '.jpeg', (error) => {
                if (error) {
                    return res.status(400).json({error: error});
                }
            	})
        }
        return res.status(200).json({
            usuario,
        });
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const foto = async (req, res) => {
    try {
        return res.status(200).sendFile(path.resolve(__dirname, "..", "..", "fotos", req.params.id + ".jpeg"));
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
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
            return res.status(403).json({message: "Não logado"});
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
            return res.status(403).json({message: "Não logado"});
        }
        const { id } = req.params;

        const usuario = await Usuario.findOne({
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
            return res.status(403).json({message: "Não logado"});
        }
        const { id } = req.params;
        const { nome, cpf,  telefone,
            tam_camisa, tam_calca,
            tam_calcado, diretor,
            instrumento_id } = req.body;

        const updated = await Usuario.update({
            nome,
            cpf,
            telefone,
            tam_camisa,
            tam_calca,
            tam_calcado,
            diretor,
            instrumento_id,
        }, {
            where: { [Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });

        const usuario = await Usuario.findOne({
            where: {[Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });
        
        if (req.file && usuario != 0) {
            
            usuario.foto = usuario.id + ".jpeg";
            await usuario.save();

            // renomeando o nome do arquivo padrão para o id.jpeg
            await fs.rename('./fotos/' + req.file.filename, './fotos/' + usuario.id + '.jpeg', (error) => {
                if (error) {
                    return res.status(500).json({error: error});
                }
            })
        }

        if (usuario != 0) {
            return res.status(200).json({
                usuario
            })
        }
        return res.status(400).json({message: "Pessoa não existe"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteOne = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
        }
        const { id } = req.params;

        const usuario = await Usuario.findOne({
            where: {[Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });

        const deleted = await Usuario.destroy({
            where: {[Op.and]: [
                { id: id }, { escola_id: req.session.escola_id }
            ]}
        });

        // Se realmente existir um usuario desse na escola, tirar a foto. PRevenindo excluir a foto;
        if (deleted) {
            if (usuario.foto == null) {
                await fs.unlink('./fotos/' + id + '.jpeg', (error) => {
                    if (error) {
                        return res.status(400).json({error: error.message});
                    }
                })
            }
           
            return res.status(200).json({
                message: "Deletado com sucesso"
            })
        } else {
            return res.status(400).json({message: "Pessoa não existe"});
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}



module.exports = {
    create,
    foto,
    list,
    listOne,
    update,
    deleteOne,
    listByInstrumento,
}