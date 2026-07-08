/* =====================================
   ANIMIX - MANGADEX
===================================== */

// BUSCAR MANGÁS
async function buscarMangaDex(titulo) {

    try {

        const resposta = await fetch(
            "/api/mangadex?title=" + encodeURIComponent(titulo),
            {
                cache: "no-store"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar mangás");
        }

        const dados = await resposta.json();

        return dados.data || [];

    } catch (e) {

        console.error(e);
        return [];

    }

}


// PEGAR CAPA
function pegarCapaMangaDex(manga) {

    const cover = manga.relationships?.find(
        rel => rel.type === "cover_art"
    );

    const fileName = cover?.attributes?.fileName;

    if (!fileName) {
        return "img/sem-capa.jpg";
    }

    return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
}



// DADOS DO MANGÁ
function dadosMangaDex(manga) {

    const titulo = manga.attributes.title || {};

    const nome =
        titulo["pt-br"] ||
        titulo.en ||
        titulo.ja ||
        Object.values(titulo)[0] ||
        "Sem título";

    const descricaoObj = manga.attributes.description || {};

    const descricao =
        descricaoObj["pt-br"] ||
        descricaoObj.en ||
        Object.values(descricaoObj)[0] ||
        "Sem descrição";

    const generos = (manga.attributes.tags || [])
        .filter(tag => tag.attributes.group === "genre")
        .map(tag =>
            tag.attributes.name["pt-br"] ||
            tag.attributes.name.en ||
            Object.values(tag.attributes.name)[0]
        );

    return {
        idDex: manga.id,
        nome,
        descricao,
        generos
    };

}
