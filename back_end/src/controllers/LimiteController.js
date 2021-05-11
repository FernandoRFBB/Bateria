const { sequelize } = require("../models/Escola")
const Limite = require("../models/Limite");

const list = async (req, res) => {
    try {
        const { escola_id } = req.params;

        // Não sei pq n funciona |const limite = await Limite.findAll();

        const limite = await sequelize.query(
            "SELECT * FROM limites WHERE escola_id = :escola_id;",
            {
                replacements: { escola_id: escola_id }
            }
        )
        return res.json({
            limite
        })
    } catch (error) {
        return res.json({error: error.message});
    }

}

const listOne = async (req, res) => {
    try {
        const { id, escola_id } = req.params;

        const limite = await sequelize.query(
            "SELECT * FROM limites WHERE escola_id = :escola_id AND id = :id",
            {
                replacements: { escola_id: escola_id, id: id }
            }
        )

        return res.json({
            limite
        })
    } catch (error) {
        return res.json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        const { id, escola_id } = req.params;
        const { limite } = req.body;

        /*const updated = await Limite.update({
            limite
        }, {
            where: { id: id}
        })*/
        const updated = await sequelize.query(
            "UPDATE limites " +
                "SET limite = :limite " +
                "WHERE escola_id = :escola_id " +
                "AND id = :id",
            {
                replacements: { limite: limite, escola_id: escola_id, id: id }
            }
        )

        const resultado = await sequelize.query(
            "SELECT * FROM limites " +
                "WHERE id = :id",
            {
                replacements: { id: id }
            }
        );
        return res.json({
            resultado
        });
    } catch (error) {
        return res.json({error: error.message})
    }
}

module.exports = {
    list,
    listOne,
    update
}