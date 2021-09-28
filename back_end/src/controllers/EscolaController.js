const { sequelize } = require("../models/Escola");
const Escola = require("../models/Escola");
const Limite = require("../models/Limite");
const Usuario = require("../models/Usuario");


const create = async (req, res) => {
    try {
        const { nome } = req.body;

        const escola = await Escola.create({ nome });
        const limites = await sequelize.query(
            "INSERT INTO limites (limite, escola_id, created_at, updated_at, instrumento_id) SELECT 10, ?, GETDATE(), GETDATE(), id FROM instrumentos",
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

        return res.status(200).json({
            escola, limites
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        const escola = await Escola.findAll();

        return res.status(200).json({
            escola,
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const listOne = async (req, res) => {
    try {
        const { id } = req.params;

        const escola = await Escola.findByPk(id);
        return res.status(200).json({
            escola,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
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
            return res.status(200).json({
                escola
            });
        }
        return res.status(553).json({message: "Escola não existe"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// const deleteOne = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Escola.destroy({
//             where: { id: id } // Mostrando que da pra fazer assim, porem nao acho tao bom
//         });

//         if (deleted) {
//             return res.json({
//                 message: "Escola deletado com sucesso",
//             })
//         }
//         throw new Error("Escola não existe");

//     } catch (error) {
//         return res.json({error: error.message});
//     }
// }

const tamanhos = async (req, res) => {
    try {
        // Metodo de consulta por query
        // const result = await sequelize.query(
        //     "SELECT tam_camisa, COUNT(id) FROM usuarios GROUP BY tam_camisa"
        //     , { type: QueryTypes.SELECT });
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }

        const camisa = await sequelize.query(
            "SELECT COUNT(id) AS qtd, tam_camisa " +
            "FROM usuarios " +
            "WHERE escola_id = ? " +
            "GROUP BY tam_camisa " +
            "ORDER BY CASE tam_camisa " +
                "WHEN 'PP' THEN 0 " +
                "WHEN 'P' THEN 1 " +
                "WHEN 'M' THEN 2 " +
                "WHEN 'G' THEN 3 " +
                "WHEN 'GG' THEN 4 " +
                "WHEN 'XG' THEN 5 " +
                "ELSE 9999 " +
                "END",
                {
                    replacements: [req.session.escola_id]
                }
        );

        const calca = await sequelize.query(
            "SELECT COUNT(id) AS qtd, tam_calca " +
            "FROM usuarios " +
            "WHERE escola_id = ? " +
            "GROUP BY tam_calca " +
            "ORDER BY CASE tam_calca " +
                "WHEN 'PP' THEN 0 " +
                "WHEN 'P' THEN 1 " +
                "WHEN 'M' THEN 2 " +
                "WHEN 'G' THEN 3 " +
                "WHEN 'GG' THEN 4 " +
                "WHEN 'XG' THEN 5 " +
                "ELSE 9999 " +
                "END",
                {
                    replacements: [req.session.escola_id]
                }
        );

        const calcado = await Usuario.findAll({
            attributes: ["tam_calcado", [sequelize.fn("count", sequelize.col("id")), "qtd"]],
            where: { escola_id: req.session.escola_id },
            group: ["tam_calcado"]
        })

        return res.status(200).json({ 
            camisa: camisa[0], calca: calca[0], calcado
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    create,
    list, 
    listOne,
    update,
    // deleteOne,
    tamanhos,
}