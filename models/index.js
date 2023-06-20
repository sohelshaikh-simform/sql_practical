const { Sequelize,DataTypes} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "sql_practical",
  process.env.username,
  process.env.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.sequelize.sync({ alter:true }).then(() => {
    console.log("yes re sync");
  });

  db.user=require('./user')(sequelize,DataTypes)
  db.product=require('./product')(sequelize,DataTypes);
  db.order=require('./order')(sequelize,DataTypes);
  db.orderDetails=require('./orderDetails')(sequelize,DataTypes);

  db.user.hasMany(db.order);
  db.order.belongsTo(db.user);

  db.product.belongsToMany(db.order,{through:"orderDetails"});
  db.order.belongsToMany(db.product,{through:"orderDetails"});

  db.product.hasMany(db.orderDetails)
  db.orderDetails.belongsTo(db.product)
  

  module.exports=db