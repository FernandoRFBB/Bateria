const Usuario = require('../models/Usuario');

const create = async (req, res) => {
    try {
        const { nome, cpf, telefone,
                tam_camisa, tam_calca,
                tam_calcado, diretor,
                escola_id, instrumento_id,
                foto } = req.body;
        
        // Preciso criar um codigo para ver se existe escola e instruemnto?

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
        const usuario = await Usuario.findAll();
        return res.json({
            usuario,
        });

    } catch (error) {
        return res.json({error: error.message});
    }
}

const listOne = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        return res.json({
            usuario,
        });
    } catch (error) {
        return res.json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
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
            where: { id: id }
        });

        if (updated) {
            const usuario = await Usuario.findByPk(id);
            return res.json({
                usuario
            })
        }
    } catch (error) {
        return res.json({ error: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Usuario.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.json({
                message: "Usuario deletado com sucesso"
            })
        };
        throw new Error("Escola não existe");
    } catch (error) {
        return res.json({ error: error.message});
    }
}

module.exports = {
    create,
    list,
    listOne,
    update,
    deleteOne,
}

