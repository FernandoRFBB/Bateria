const { Model, DataTypes } = require("sequelize");

class Escola extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize // Para conectar ao banco
        })
    }

    static associate(models) {
        this.hasMany(models.Usuario, {
            foreignKey: "escola_id",
            as: "usuarios"
        })
    }
}

module.exports = Escola;