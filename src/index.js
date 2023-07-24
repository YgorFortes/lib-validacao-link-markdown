import chalk from 'chalk';
import fs from 'fs';

function tratarErro(erro){
  throw new Error(console.log(chalk.red(`Caminho não encontado. Tipo de erro: ${chalk.black.bgGreen(`${erro.code}`)}.`)));
}


export default async function buscarArquivo(caminho){
  try{
    const enconding = 'utf8';
    const texto = await fs.promises.readFile(caminho, enconding);
    return extrairLinks(texto)
  }catch(erro){
    tratarErro(erro)
  }
}

function extrairLinks(texto){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const  captura = texto.matchAll(regex);
  const arrayCaptura= [...captura];
  if(arrayCaptura.length === 0){
    return console.log(chalk.red('Nenhum link foi encontrado'))
  }else {
    return arrayCaptura.map((novoArray) => ({titulo: novoArray[1], link: novoArray[2]}));
  }
}



