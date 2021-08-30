const { sequelize } = require("../models/Instrumento");
const Instrumento = require("../models/Instrumento");

// const create = async (req, res) => {
//     try {
//         const { nome, foto } = req.body;

//         const instrumento = await Instrumento.create({ nome, foto });
//         return res.json({ 
//             instrumento,
//         });
//     } catch (error) {
//         return res.json({error: error.message});
//     }
// }

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }
        
        const instrumento = await sequelize.query(
            "SELECT i.id, i.nome, l.limite, i.foto FROM instrumentos i " + 
                "INNER JOIN limites l " + 
                "ON i.id = l.instrumento_id " +
                "WHERE l.escola_id = ?",
                {
                    replacements: [req.session.escola_id]
                }
        );

        return res.status(200).json({
            instrumento,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const listOne = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(550).json({message: "Não logado"});
        }

        const { id } = req.params;

        const instrumento = await Instrumento.findByPk(id);
        return res.status(200).json({
            instrumento,
        });
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
        const { nome } = req.body;
        const updated = await Instrumento.update({ nome }, {
            where: { id: id }
        });

        if (updated) {
            const instrumento = await Instrumento.findByPk(id);
            return res.status(200).json({
                instrumento
            });
        }
        return res.status(553).json({message: "Instrumento não existe"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// const deleteOne = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Instrumento.destroy({
//             where: { id } // Mostrando que da pra fazer assim, porem nao acho tao bom
//         });

//         if (deleted) {
//             return res.json({
//                 message: "Instrumento deletado com sucesso"
//             })
//         }
//         throw new Error("Instrumento não existe");

//     } catch (error) {
//         return res.json({error: error.message});
//     }
// }

module.exports = {
    // create,
    list,
    listOne,
    update,
    // deleteOne
}