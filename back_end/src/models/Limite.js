const { Model, DataTypes } = require("sequelize");

class Limite extends Model {
    static init (sequelize) {
        super.init({
            limite: DataTypes.INTEGER,
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

module.exports = Limite;