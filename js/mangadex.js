/* =====================================
   ANIMIX - MANGADEX
===================================== */


// BUSCAR MANGÁS
async function buscarMangaDex(titulo){

    try{

        const resposta = await fetch(
            "/api/mangadex?title=" + encodeURIComponent(titulo)
        );

        const dados = await resposta.json();

        return dados.data || [];

    }catch(e){

        console.error(e);
        return [];

    }

}




// PEGAR CAPA
async function pegarCapaMangaDex(manga){

    try{


        const resposta = await fetch(
            "/api/cover?id=" + manga.id
        );


        const dados = await resposta.json();



        if(!dados.data || dados.data.length === 0){

            return "img/sem-capa.jpg";

        }



        let capa = dados.data.find(

            c => c.attributes.locale === "en"

        );


        if(!capa){

            capa = dados.data[0];

        }



        let arquivo = capa.attributes.fileName;



        let url =

        "https://uploads.mangadex.org/covers/" +
        manga.id +
        "/" +
        arquivo;



        console.log(url);



        return url;



    }catch(e){


        console.error(
            "Erro capa:",
            e
        );


        return "img/sem-capa.jpg";


    }


}





// DADOS DO MANGÁ

function dadosMangaDex(manga){


    let titulo = manga.attributes.title;


    let nome =

        titulo.en ||

        titulo["pt-br"] ||

        titulo.ja ||

        Object.values(titulo)[0];



    let descricao =

        manga.attributes.description?.en ||

        "Sem descrição";



    let generos =

    manga.attributes.tags

    .filter(

        t =>

        t.attributes.group === "genre"

    )

    .map(

        t =>

        t.attributes.name.en

    );



    return {


        idDex:manga.id,


        nome:nome,


        descricao:descricao,


        generos:generos


    };


}
