/* =====================================
   ANIMIX
   MANGADEX INTEGRATION
   VIA VERCEL FUNCTIONS
===================================== */


// ===============================
// BUSCAR MANGÁS
// ===============================

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
            "Erro ao buscar MangaDex:",
            erro
        );


        return [];


    }


}






// ===============================
// PEGAR CAPA DO MANGÁ
// ===============================

async function pegarCapaMangaDex(manga) {


    try {


        let resposta = await fetch(

            "/api/cover?id=" +
            manga.id

        );


        let dados = await resposta.json();



        if (
            dados.data &&
            dados.data.length > 0
        ) {


            let arquivo =

                dados.data[0]
                .attributes
                .fileName;



            return (

                "https://uploads.mangadex.org/covers/" +

                manga.id +

                "/" +

                arquivo

            );


        }


        return "";


    } catch (erro) {


        console.error(
            "Erro ao pegar capa:",
            erro
        );


        return "";


    }


}







// ===============================
// ORGANIZAR DADOS DO MANGÁ
// ===============================

function dadosMangaDex(manga) {


    let titulo =

        manga.attributes.title;



    let nome =

        titulo.en ||

        titulo["pt-br"] ||

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


        idDex: manga.id,


        nome: nome,


        descricao:

            descricao.en ||

            "",



        generos: generos


    };


}







// ===============================
// BUSCAR CAPÍTULOS
// ===============================

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
