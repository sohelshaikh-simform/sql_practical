module.exports=(sequelize,DataTypes)=>{
    const orderDetails=sequelize.define('orderDetails',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull:false
        },
        orderId:{
            type:DataTypes.INTEGER,
        },   productId:{
            type: DataTypes.INTEGER,
        },
    },{
        timestamps:false
    })
    return orderDetails;
}