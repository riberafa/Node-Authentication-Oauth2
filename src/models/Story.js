const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Story = sequelize.define('Story', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

	body: { //primeiro e último
		type: DataTypes.STRING,
        allowNull: false,
	},

	status: {
		type: DataTypes.ENUM('public', 'private'),
        allowNull: false,
        defaultValue: 'public',
	},

    createdAt: {
        type: DataTypes.DATE,
        default: Date.now,
    }
    
}, {
    // timestamps: false
});

Story.associate = function(models) {
    Story.hasMany(models.User);   
    Story.belongsTo(models.User)   
}


module.exports = Story;
