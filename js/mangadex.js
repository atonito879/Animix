/* =====================================
   ANIMIX
   MANGADEX API VIA VERCEL FUNCTION
===================================== */


const MANGADEX_API = "/api/mangadex";





// ===============================
// BUSCAR MANGÁ
// ===============================

async function buscarMangaDex(titulo){


try{


let resposta = await fetch(

MANGADEX_API +

"?title=" +

encodeURIComponent(titulo)

);



let dados = await resposta.json();



return dados.data || [];



}

catch(erro){


console.error(

"Erro MangaDex:",

erro

);



return [];


}


}







// ===============================
// PEGAR CAPA
// ===============================

async function pegarCapaMangaDex(manga){



try{


let resposta = await fetch(

"https://api.mangadex.org/cover?manga[]="

+

manga.id

);



let dados = await resposta.json();



if(dados.data.length){


let arquivo =

dados.data[0]

.attributes

.fileName;



return (

"https://uploads.mangadex.org/covers/"

+

manga.id

+

"/"

+

arquivo

);



}



return "";



}

catch(erro){


console.log(erro);


return "";


}


}







// ===============================
// DADOS DO MANGÁ
// ===============================

function dadosMangaDex(manga){



let titulo =

manga.attributes.title;



let nome =

titulo.en ||

Object.values(titulo)[0];



let descricao =

manga.attributes.description || {};



return {


idDex:manga.id,


nome:nome,


descricao:

descricao.en || "",


generos:

manga.attributes.tags

.map(

tag =>

tag.attributes.name.en

)


};



}






// ===============================
// CAPÍTULOS
// ===============================


async function buscarCapitulosDex(id){


let resposta = await fetch(

"https://api.mangadex.org/chapter?manga="

+

id

+

"&translatedLanguage[]=pt-br&order[chapter]=asc"

);



let dados = await resposta.json();



return dados.data || [];


}
