const { Model, DataTypes } = require("sequelize");

class Instrumento extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            foto: DataTypes.STRING,
        }, {
            sequelize // Para conectar ao banco
        })
    }

    static associate(models) {
        this.hasMany(models.Usuario, {
            foreignKey: "instrumento_id",
            as: "usuarios"
        })
    }
}

module.exports = Instrumento;