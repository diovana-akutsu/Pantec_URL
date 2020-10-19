// nao mexer nesta linha!
const banco = require(`./configuracoes-banco`);

// função que recebe valores do sensor ou aleatórios
// e faz um insert no banco de dados
function registrar_registro(uso, disco, mem ,gpu) {

    console.log('Iniciando inclusão de novo registro...');

    console.log(`uso: ${uso}`);

    
    const registros_mantidos_tabela_registro = 8;
    
    const instrucao_sql = `
        INSERT into registro (componente, uso, momento)
        values (1, ${uso}, CONVERT(Datetime, '${agora()}', 120));
        INSERT into registro (componente, uso, momento)
        values (2, ${disco}, '${agora()}');

        INSERT into registro (componente, uso, momento)
        values (3, ${mem}, '${agora()}');

        INSERT into registro (componente, uso, momento)
        values (4, ${gpu}, '${agora()}');
    `
        
    console.log(`Executando a instrução: \n ${instrucao_sql}`);

    banco.conectar().then(() => {

        return banco.sql.query(`
            begin tran; 
            ${instrucao_sql} 
            commit tran;` )
        .then(() => {
            console.log('Instrução executada com sucesso!');
        });
        

    }).catch(erro => {

        console.error(`Erro ao tentar registrar aquisição na base: ${erro}\n\n`);

    }).finally(() => {
        banco.sql.close().then(()=> {
            console.log('Conexão fechada');
        });
    });
}

// função que recebe valores do sensor ou aleatórios
// e faz um insert no banco de dados
function registrar_registro_teste_loko(uso, disco, mem ,gpu) {

    console.log('Iniciando inclusão de novo registro...');

    console.log(`uso: ${uso} disco:${disco} mem: ${mem} gpu: ${gpu}`);
    
    
    let instrucoes = [
        `INSERT into registro (componente, uso, momento)
        values (1, ${uso}, '${agora()}');`,

        `INSERT into registro (componente, uso, momento)
        values (2, ${disco}, '${agora()}');`,

        `INSERT into registro (componente, uso, momento)
        values (3, ${mem}, '${agora()}');`,

        `INSERT into registro (componente, uso, momento)
        values (4, ${gpu}, '${agora()}');`,

        'select * from registro'
    ]
    
    if (instrucoes.length==0) {
        console.log('Nenhuma instrução SQL configurada!');
        return; // encerra a função imediatamente
    }

    
    executar(0);
    executar(2);
    executar(4);
    executar(6);
    for(i=0; i<instrucoes.length; i=i+2){

    function executar(i) {
        const instrucao_atual = instrucoes[i];
        console.log(`Executando a instrução #${i}: \n ${instrucao_atual}`);
        
        banco.conectar().then(() => {
            return banco.sql.query(instrucao_atual).then((r) => {
                console.log(`Instrução executada com sucesso! ${JSON.stringify(r.recordsets[0])}`);
                i++;
            });
        }).catch(erro => {
            console.error(`Erro ao tentar registrar aquisição na base: ${erro}\n\n`);
            i=-1;
        }).finally(() => {
            banco.sql.close().then(()=> {
                console.log('Conexão fechada!');
                if (i>-1 && i<instrucoes.length) {
                    executar(i);
                }
            });
        });
    }
}

    
}

// função que retorna data e hora atual no formato aaaa-mm-dd HH:mm:ss
function agora() {
    let agora_d = new Date();
	const retorno = `${agora_d.getFullYear()}-${agora_d.getMonth()+1}-${agora_d.getDate()} ${agora_d.getHours()}:${agora_d.getMinutes()}:${agora_d.getSeconds()}`;
	console.log(`Data e hora atuais: ${retorno}`);
	return retorno;
}


module.exports = {
    registrar_registro: registrar_registro
}
