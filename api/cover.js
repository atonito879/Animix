export default async function handler(req, res) {


const id = req.query.id;


if(!id){

return res.status(400).json({
erro:"ID não informado"
});

}


try{


const resposta = await fetch(

"https://api.mangadex.org/cover?manga[]=" + id

);


const dados = await resposta.json();



res.setHeader(
"Access-Control-Allow-Origin",
"*"
);



res.status(200).json(dados);



}

catch(erro){


res.status(500).json({

erro:"Erro ao buscar capa"

});


}


}
