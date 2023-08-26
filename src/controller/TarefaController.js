import { Router } from 'express';
import { inserir, listarTarefa, tarefaFinalizada, alterarTarefa, apagarTarefa} from "../repository/tarefaRepository.js";

let endpoints = Router(); 

endpoints.post('/tarefa', async (req, resp) => {
    let tarefa = req.body;
    let dados = await inserir(tarefa);
    resp.send(dados);
})

endpoints.get('/tarefa', async (req, resp) => {
    let dados = await listarTarefa();
    resp.send(dados);
})

endpoints.get('/tarefa/finalizadas', async (req,resp) =>{
    let dados = await tarefaFinalizada();
    resp.send(dados);
});

endpoints.put('/tarefa/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let cliente = req.body;
      let r = await alterarTarefa(id, cliente );

      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })

endpoints.delete('/tarefa/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let r = await apagarTarefa(id);
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })

export default endpoints;