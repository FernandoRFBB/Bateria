const { sequelize } = require("../models/Instrumento");
const Instrumento = require("../models/Instrumento");
const Usuario = require("../models/Usuario");

const create = async (req, res) => {
    try {
        const { nome, foto } = req.body;

        // se quiser criar outros depois verificar o req.session.escola_id para so adicionar naquela escola
        
        const instrumento = await Instrumento.create({ nome, foto });
        return res.json({ 
            instrumento,
        });
    } catch (error) {
        return res.json({error: error.message});
    }
}

const list = async (req, res) => {
    try {
        if (req.session.usuario_id == null) {
            return res.status(403).json({message: "Não logado"});
        }
        
        const instrumento = await sequelize.query(
            "SELECT i.id, i.nome, l.limite, i.foto, COUNT(u.id) AS qtdPessoas " + 
                "FROM instrumentos i " + 
                "LEFT JOIN (SELECT * FROM limites WHERE escola_id = ?) l ON i.id = l.instrumento_id " + 
                "LEFT JOIN (SELECT * FROM usuarios WHERE escola_id = ?) u ON i.id = u.instrumento_id " + 
                "GROUP BY i.id, i.nome, l.limite, i.foto " +
                "ORDER BY i.nome",
                {
                    replacements: [req.session.escola_id, req.session.escola_id]
                }
        );
        instrumento[0].forEach(i => {
            // o QTD PESSOAS que vem do SELECT, sao a quantidade de pessoas naquele instrumento, e aqui eu transformo em quantas pessoas faltam para estar no limite maximo
            i.qtdPessoas = i.limite - i.qtdPessoas;
        });

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
            return res.status(403).json({message: "Não logado"});
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
            return res.status(403).json({message: "Não logado"});
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
        return res.status(400).json({message: "Instrumento não existe"});

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
    create,
    list,
    listOne,
    update,
    // deleteOne
}