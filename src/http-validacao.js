export default async function listaValidada(listaDeLinks){
  const links = extrairLinks(listaDeLinks)
  const status = await checaStatus(links);
  return listaDeLinks.map((objeto,index)=> ({...objeto, status: status[index]}))
}

function manejaErros(erro){
  if(erro.cause.code === 'ENOTFOUND'){
    return 'Site não encontrado';
  }
}

function extrairLinks(arrayObjetos){
  return arrayObjetos.map((objeto)=> objeto.link);
}

function LinkForaDoAr(response){
  if(response.status === 404){
    return 'Link fora do ar';
  }else {
    return `${response.status} - ${response.statusText}`;
  }
}

async function checaStatus(listaUrls){
  const arrayStatus = await Promise.all(
    listaUrls.map(async (url)=>{
      try{
        const response = await fetch(url);
        return LinkForaDoAr(response);
      }catch(erro){
        return manejaErros(erro);
      }
    })
  );
  return arrayStatus;
}

