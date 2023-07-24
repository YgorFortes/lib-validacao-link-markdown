import chalk from "chalk";
import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import buscarArquivo from "./index.js";
import listaValidada from "./http-validacao.js"


const  comando  =  yargs ( hideBin ( process . argv ) ) . argv 




function tratandoErros(erro){
  if(erro.code === 'ENOENT'){
    console.log(chalk.red('Diretorio, ou arquivo não existe'));
    return;
  }
}

async function imprimeTexto(valida, resultado, nomeDoArquivo = ''){
  if(valida){
    console.log(chalk.black.bgGreen('Arquivo: ', nomeDoArquivo), 'Resultado: ',await listaValidada(resultado)); 
  }else{
    console.log(chalk.black.bgGreen('Arquivo: ', nomeDoArquivo), 'Resultado: ', resultado);
  }
}

async function processaTexto(caminho){
  const valida = comando.valida === true;
  caminho = comando._.find(element => element);
  try{
    if(fs.lstatSync(caminho).isFile()){
      const resultado = await buscarArquivo(caminho);
      imprimeTexto(valida, resultado);
    }else {
      // Lendo o diretorio dos arquivos
      const arquivos = await fs.promises.readdir(caminho);
      arquivos.forEach(async(arquivo)=> {
        const resultado = await buscarArquivo(`${caminho}/${arquivo}`)
        imprimeTexto(valida, resultado, arquivo);
      });
    }

  }catch(erro){
    tratandoErros(erro)
  }
}


processaTexto(comando)

