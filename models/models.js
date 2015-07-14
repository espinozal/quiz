var path = require('path');

// cargar modelo ORM
var Sequelize = require('sequelize');

// usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; // exportar la definición de la tabla Quiz

// crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function(){
	// success ... ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0) {     // la tabla se inicializa sólo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia', respuesta: 'Roma'})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});