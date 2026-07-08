/* =====================================
   ANIMIX v2.0
   MANGADEX API
===================================== */


const MANGADEX_API = 
"https://api.mangadex.org";





// ===============================
// BUSCAR MANGÁ
// ===============================


async function buscarMangaDex(titulo){


try{


let resposta = await fetch(

MANGADEX_API +

"/manga?title=" +

encodeURIComponent(titulo) +

"&limit=10"

);



let dados = await resposta.json();



return dados.data;



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



let id = manga.id;



let resposta = await fetch(

MANGADEX_API +

"/cover?manga[]=" +

id

);



let dados = await resposta.json();





if(dados.data.length){



let arquivo =

dados.data[0]

.attributes

.fileName;




return (

"https://uploads.mangadex.org/covers/" +

id +

"/" +

arquivo

);



}



return "";



}








// ===============================
// INFORMAÇÕES DO MANGÁ
// ===============================


function dadosMangaDex(manga){



let titulo =

manga.attributes

.title;



let nome =

titulo.en ||

Object.values(titulo)[0];




let descricao =

manga.attributes

.description;



return {


idDex:manga.id,


nome:nome,


descricao:

descricao.en || "",


generos:

manga.attributes

.tags

.map(

tag =>

tag.attributes.name.en

)



};



}








// ===============================
// BUSCAR CAPÍTULOS
// ===============================


async function buscarCapitulosDex(id){



let resposta = await fetch(


MANGADEX_API +

"/chapter?manga=" +

id +

"&translatedLanguage[]=pt-br&order[chapter]=asc&limit=100"


);



let dados = await resposta.json();



return dados.data;



}
