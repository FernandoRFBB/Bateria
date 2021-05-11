const { Op } = require('sequelize');
const { sequelize } = require('../models/Usuario');
const Usuario = require('../models/Usuario');

const create = async (req, res) => {
    try {
        const { escola_id } = req.params;
        const { nome, cpf, telefone,
                tam_camisa, tam_calca,
                tam_calcado, diretor,
                instrumento_id, foto } = req.body;

        const usuario = await Usuario.create({
            nome,
            cpf,
            telefone,
            tam_camisa,
            tam_calca,
            tam_calcado,
            diretor,
            escola_id,
            instrumento_id,
            foto
        });
        
        return res.json({
            usuario,
        });
        
    } catch (error) {
        return res.json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        const { escola_id } = req.params;
        const usuario = await Usuario.findAll({
            where: { escola_id: escola_id }
        });
        if (usuario != 0) {
            return res.json({
                usuario,
            });
        }
        
        throw new Error("Escola não encontrada");
    } catch (error) {
        return res.json({error: error.message});
    }
}

const listOne = async (req, res) => {
    try {
        const { id, escola_id } = req.params;

        const usuario = await Usuario.findAll({
            where: {[Op.and]: [
                { id: id }, { escola_id: escola_id }
            ]}
        });
        if (usuario != 0) {
            return res.json({
                usuario,
            });
        }
        throw new Error("Usuario não encontrado");
    } catch (error) {
        return res.json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        const { id, escola_id } = req.params;
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
                { id: id }, { escola_id: escola_id }
            ]}
        });

        if (updated != 0) {
            const usuario = await Usuario.findByPk(id);
            return res.json({
                usuario
            })
        }
        throw new Error("Usuario não encontrado")
    } catch (error) {
        return res.json({ error: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id, escola_id } = req.params;
        const deleted = await Usuario.destroy({
            where: { [Op.and]: [
                { id: id },
                { escola_id: escola_id }
            ]}
        });

        if (deleted) {
            return res.json({
                message: "Usuario deletado com sucesso"
            })
        }
        throw new Error("Usuario não encontrado");
    } catch (error) {
        return res.json({ error: error.message});
    }
}

const tamanhos = async (req, res) => {
    try {
        // Metodo de consulta por query
        // const result = await sequelize.query(
        //     "SELECT tam_camisa, COUNT(id) FROM usuarios GROUP BY tam_camisa"
        //     , { type: QueryTypes.SELECT });
        const { escola_id } = req.params;
        const camisa = await Usuario.findAll({
            attributes: ["tam_camisa", [sequelize.fn("count", sequelize.col("id")), "qtd"]],
            where: { escola_id: escola_id },
            group: ["tam_camisa"],
        })
        const calca = await Usuario.findAll({
            attributes: ["tam_calca", [sequelize.fn("count", sequelize.col("id")), "qtd"]],
            where: { escola_id: escola_id },
            group: ["tam_calca"],
        })
        const calcado = await Usuario.findAll({
            attributes: ["tam_calcado", [sequelize.fn("count", sequelize.col("id")), "qtd"]],
            where: { escola_id: escola_id },
            group: ["tam_calcado"],
        })
        return res.json({ 
            camisa, calca, calcado
        })
    } catch (error) {
        return res.json({error: error.message});
    }
}

module.exports = {
    create,
    list,
    listOne,
    update,
    deleteOne,
    tamanhos,
}

