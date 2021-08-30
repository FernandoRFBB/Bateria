const { sequelize } = require("../models/Escola")
const Limite = require("../models/Limite");

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }

        // Não sei pq n funciona |const limite = await Limite.findAll();
        const limite = await sequelize.query(
            "SELECT * FROM limites WHERE escola_id = ?",
            {
                replacements: [req.session.escola_id]
            }
        )
        return res.status(200).json({
            limite
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

}

const listOne = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        const { instrumento_id } = req.params;

        const limite = await sequelize.query(
            "SELECT * FROM limites WHERE escola_id = :escola_id AND instrumento_id = :instrumento_id",
            {
                replacements: { escola_id: req.session.escola_id, instrumento_id: instrumento_id }
            }
        )

        return res.status(200).json({
            limite
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        const { instrumento_id } = req.params;
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
                "AND instrumento_id = :instrumento_id",
            {
                replacements: { limite: limite, escola_id: req.session.escola_id, instrumento_id: instrumento_id }
            }
        )

        return res.status(200).json({
            updated
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    list,
    listOne,
    update
}