module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expected_delivery_date: {
      type: DataTypes.DATE,
      defaultValue: () => {
        const curentDate = new Date();
        const randomday = Math.floor(Math.random() * 6) + 1;
        const newDate = new Date(
          curentDate.getTime() + randomday * 24 * 60 * 60 * 1000
        );
        return newDate;
      },
    },
  });
  return Order;
};
