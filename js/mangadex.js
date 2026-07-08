/* =====================================
   ANIMIX
   MANGADEX API
   VIA VERCEL FUNCTIONS
===================================== */



// =====================================
// BUSCAR MANGÁS
// =====================================

async function buscarMangaDex(titulo) {

    try {

        let resposta = await fetch(
            "/api/mangadex?title=" +
            encodeURIComponent(titulo)
        );


        let dados = await resposta.json();


        return dados.data || [];


    } catch (erro) {

        console.error(
            "Erro ao buscar mangá:",
            erro
        );

        return [];

    }

}





// =====================================
// PEGAR CAPA DO MANGÁ
// =====================================

async function pegarCapaMangaDex(manga) {


    try {


        let resposta = await fetch(

            "/api/cover?id=" +
            manga.id

        );


        let dados = await resposta.json();



        if (
            !dados.data ||
            dados.data.length === 0
        ) {

            return "";

        }




        // pega a primeira capa válida

        let capa = dados.data.find(

            item =>

            item.attributes &&
            item.attributes.fileName

        );



        if(!capa){

            return "";

        }





        let arquivo =

        capa.attributes.fileName;





        // URL correta MangaDex

        let url =

        "https://uploads.mangadex.org/covers/" +

        manga.id +

        "/" +

        arquivo +

        ".512.jpg";





        console.log(
            "Capa:",
            url
        );





        return url;




    } catch (erro) {


        console.error(

            "Erro ao buscar capa:",

            erro

        );


        return "";


    }


}







// =====================================
// ORGANIZAR DADOS DO MANGÁ
// =====================================

function dadosMangaDex(manga) {


    let titulo =

    manga.attributes.title;




    let nome =

    titulo.en ||

    titulo["pt-br"] ||

    titulo.ja ||

    Object.values(titulo)[0];





    let descricao =

    manga.attributes.description || {};





    let generos =

    manga.attributes.tags

    .filter(

        tag =>

        tag.attributes.group === "genre"

    )

    .map(

        tag =>

        tag.attributes.name.en

    );





    return {


        idDex:

        manga.id,


        nome:

        nome,


        descricao:

        descricao.en || "",


        generos:

        generos


    };


}







// =====================================
// BUSCAR CAPÍTULOS
// =====================================

async function buscarCapitulosDex(id) {


    try {


        let resposta = await fetch(

            "/api/chapters?id=" +

            id

        );



        let dados = await resposta.json();



        return dados.data || [];



    } catch (erro) {


        console.error(

            "Erro capítulos:",

            erro

        );



        return [];


    }


}
