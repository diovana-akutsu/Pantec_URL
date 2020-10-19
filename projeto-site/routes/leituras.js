var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* Recuperar as últimas N leituras */
router.get('/cpu', function(req, res, next) {
   
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
   
	const instrucaoSql = `select top ${limite_linhas}
							componente, 
							uso, 
							momento,
							FORMAT(momento,'HH:mm:ss') as momento_grafico 
							from registro where componente=1 order by id desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});

/* Recuperar as últimas N leituras */
router.get('/disco', function(req, res, next) {
   
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
   
	const instrucaoSql = `select top ${limite_linhas}
							componente, 
							uso, 
							momento,
							FORMAT(momento,'HH:mm:ss') as momento_grafico 
							from registro where componente=2 order by id desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});

router.get('/mem', function(req, res, next) {
   
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
   
	const instrucaoSql = `select top ${limite_linhas}
							componente, 
							uso, 
							momento,
							FORMAT(momento,'HH:mm:ss') as momento_grafico 
							from registro where componente=3 order by id desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});


router.get('/gpu', function(req, res, next) {
   
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
   
	const instrucaoSql = `select top ${limite_linhas}
							componente, 
							uso, 
							momento,
							FORMAT(momento,'HH:mm:ss') as momento_grafico 
							from registro where componente=4 order by id desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});

// tempo real (último valor de cada leitura)
router.get('/tempo-real', function (req, res, next) {
   
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select top 1 componente, uso, FORMAT(momento,'HH:mm:ss') as momento_grafico  
						from registro order by id desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
 
});


// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
   
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(componente) as temp_maxima, 
							min(componente) as temp_minima, 
							avg(componente) as temp_media,
							max(uso) as uso_maxima, 
							min(uso) as uso_minima, 
							avg(uso) as uso_media 
						from registro`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
 
});


module.exports = router;