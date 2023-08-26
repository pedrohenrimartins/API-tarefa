import conexao from "./conection.js";

export async function inserir(tarefa) {
    let sql = 'insert into tb_tarefa (ds_tarefa, nr_ordem, bt_finalizado, dt_cadastro) values (?, ?, ?, ?)';
    let resp = await conexao.query(sql, [tarefa.descricao, tarefa.ordem, tarefa.finalizado, tarefa.cadastro]);
    let dados = resp[0];

    tarefa.id = dados.insertId;
    return tarefa;
}

export async function listarTarefa() {
    let sql = 'select * from tb_tarefa';

    let resp = await conexao.query(sql);
    let dados = resp[0];

    return dados;
}

export async function tarefaFinalizada(){
    let sql = 'select * from tb_tarefa where bt_finalizado = 1';
    let resp = await conexao.query(sql)

    let dados = resp[0];
    return dados
}

export async function alterarTarefa(id, tarefa){
    let comando = 'update tb_tarefa set ds_tarefa = ? where id_tarefa = ?';
    
    let [info] = await conexao.query(comando, [
        tarefa.descricao,
        id
    ])

    let linha = info.affectedRows;
    return linha;
}

export async function apagarTarefa(id){
    let comando = 'delete from tb_tarefa where id_tarefa = ?'
    
    let [info] = await conexao.query(comando, [id])

    let linha = info.affectedRows;
    return linha;
}