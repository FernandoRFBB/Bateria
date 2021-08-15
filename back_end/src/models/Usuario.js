const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.INTEGER,
            telefone: DataTypes.INTEGER,
            tam_camisa: DataTypes.STRING,
            tam_calca: DataTypes.STRING,
            tam_calcado: DataTypes.INTEGER,
            diretor: DataTypes.STRING,
            foto: DataTypes.STRING,
        }, {
            sequelize
        })
    }
    static associate(models) { 
        this.belongsTo(models.Escola, {
            foreignKey: "escola_id", as: "escola"
        })
        this.belongsTo(models.Instrumento, {
            foreignKey: "instrumento_id", as: "instrumento"
        })
    }
}

module.exports = Usuario;