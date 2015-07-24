var models = require('../models/models.js')

// autoload, factoriza el código si la ruta incluye : quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			}else { next(new Error('No existe quizId= ' + quizId));}
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res){
	var criterio = req.query.search;			// criterio de búsqueda en la base de datos
	if(criterio === undefined){					// no se ha escrito ningún texto a buscar
		criterio = "%";							// mostrará todas las filas
	}
	else{
		criterio = "%" + criterio.trim() + "%";	// se eliminan espacios en blanco y se utiliza comodín
		criterio = criterio.replace(" ","%");	
		criterio = criterio.toUpperCase();		// hacemos la búsqueda insensitiva
	}
	models.Quiz.findAll({ where: ["upper(pregunta) like ?", criterio] }).then(function(quizes){
		res.render('quizes/index', { quizes: quizes});
	}
	).catch(function(error){ next(error);})
};

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Luis Enrique Espinoza'});
};