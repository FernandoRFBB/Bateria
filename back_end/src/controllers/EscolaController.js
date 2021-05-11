const { sequelize } = require("../models/Escola");
const Escola = require("../models/Escola");
const Limite = require("../models/Limite");


const create = async (req, res) => {
    try {
        const { nome } = req.body;

        const escola = await Escola.create({ nome });
        const limites = await sequelize.query(
            "INSERT INTO limites (limite, escola_id, instrumento_id) SELECT 10, ?, id FROM instrumentos",
            {
                replacements: [escola.id]
            }
        )
        // var limite = instrumento.map(async (inst) => {
        //     var temp = await Limite.create({
        //         escola_id: escola.id,
        //         instrumento_id: inst.id,
        //         limite: 10,
        //     })
        //     console.log(temp);
        // })
        // for (var i = 0; i < instrumento.length; i++) {
        //     var test = instrumento(i);
        //     console.log(test.dataValues.id);
        // }

        return res.json({
            escola, limites
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