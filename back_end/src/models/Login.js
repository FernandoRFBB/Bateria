const { Model, DataTypes } = require("sequelize");

class Login extends Model { 
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nivel: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Escola, {
            foreignKey: "escola_id", as: "escola"
        })
    }
}

module.exports = Login;