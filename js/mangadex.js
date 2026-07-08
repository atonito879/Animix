// ===============================
// BUSCAR MANGÁS
// ===============================

async function buscarMangaDex(titulo){

    try{

        const resposta = await fetch(
            "/api/mangadex?title=" +
            encodeURIComponent(titulo)
        );

        const dados = await resposta.json();

        return dados.data || [];

    }

    catch(e){

        console.log(e);

        return [];

    }

}



// ===============================
// PEGAR CAPA
// ===============================

async function pegarCapaMangaDex(manga){

    if(!manga.relationships)
        return "";

    const cover = manga.relationships.find(

        r => r.type === "cover_art"

    );

    if(!cover)
        return "";

    if(!cover.attributes)
        return "";

    const file = cover.attributes.fileName;

    return `https://uploads.mangadex.org/covers/${manga.id}/${file}`;

}



// ===============================
// ORGANIZAR DADOS
// ===============================

function dadosMangaDex(manga){

    const titulo = manga.attributes.title;

    const nome =

        titulo["pt-br"] ||

        titulo.en ||

        titulo.ja ||

        Object.values(titulo)[0];



    const descricao =

        manga.attributes.description.en ||

        "";



    const generos =

        manga.attributes.tags

        .filter(

            t => t.attributes.group=="genre"

        )

        .map(

            t=>t.attributes.name.en

        );



    return{

        idDex:manga.id,

        nome,

        descricao,

        generos

    };

}



// ===============================
// CAPÍTULOS
// ===============================

async function buscarCapitulosDex(id){

    try{

        const resposta = await fetch(

            "/api/chapters?id="+id

        );

        const dados = await resposta.json();

        return dados.data || [];

    }

    catch{

        return [];

    }

}
