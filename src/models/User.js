const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },

	displayName: { //primeiro e último
		type: DataTypes.STRING,
        allowNull: false,
	},

	firstName: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
    },

    createdAt: {
        type: DataTypes.DATE,
        default: Date.now,
    }
    
}, {
    // timestamps: false
});

User.associate = function(models) {
    User.hasMany(models.Story);      
}

module.exports = User;
