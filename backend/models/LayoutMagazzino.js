// backend/models/LayoutMagazzino.js
export default (sequelize, DataTypes) => {
    return sequelize.define('LayoutMagazzino', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contenuto: {
        type: DataTypes.JSON,
        allowNull: false,
      }
    }, {
      tableName: 'layout_magazzino',
      timestamps: true
    });
  };
  