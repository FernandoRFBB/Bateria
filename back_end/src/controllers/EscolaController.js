const Escola = require("../models/Escola");

const create = async (req, res) => {
    try {
        const { nome } = req.body;

        const escola = await Escola.create({ nome });
        return res.json({
            escola,
        });
    } catch (error) {
        return res.json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        const escola = await Escola.findAll();
        return res.json({
            escola,
        })
    } catch (error) {
        return res.json({error: error.message})
    }
}

const listOne = async (req, res) => {
    try {
        const { id } = req.params;
        
        const escola = await Escola.findByPk(id);
        return res.json({
            escola,
        });
    } catch (error) {
        return res.json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const updated = await Escola.update({ nome }, {
            where: { id: id }
        });

        if (updated) {
            const escola = await Escola.findByPk(id);
            return res.json({
                escola
            });
        }
        throw new Error("Escola não existe");

    } catch (error) {
        return res.json({error: error.message});
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Escola.destroy({
            where: { id } // Mostrando que da pra fazer assim, porem nao acho tao bom
        });

        if (deleted) {
            return res.json({
                message: "Escola deletado com sucesso"
            })
        }
        throw new Error("Escola não existe");

    } catch (error) {
        return res.json({error: error.message});
    }
}

module.exports = {
    create,
    list,
    listOne,
    update,
    deleteOne
}