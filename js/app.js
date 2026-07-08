/* =====================================
   ANIMIX v2.0
   APP.JS
   Funções gerais do site
===================================== */



// ===============================
// USUÁRIO
// ===============================

function salvarUsuario(nome){

    localStorage.setItem(
        "usuario",
        nome
    );

}

function pegarUsuario(){

    return localStorage.getItem(
        "usuario"
    );

}

function sairUsuario(){

    localStorage.removeItem(
        "usuario"
    );

    location.reload();

}



// ===============================
// FAVORITOS
// ===============================

function pegarFavoritos(){

    return JSON.parse(

        localStorage.getItem(
            "favoritos"
        )

    ) || [];

}

function adicionarFavorito(id){

    let favoritos = pegarFavoritos();

    if(!favoritos.includes(id)){

        favoritos.push(id);

        localStorage.setItem(

            "favoritos",

            JSON.stringify(favoritos)

        );

    }

}

function removerFavorito(id){

    let favoritos = pegarFavoritos();

    favoritos = favoritos.filter(

        item => item != id

    );

    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );

}

function estaFavorito(id){

    return pegarFavoritos().includes(id);

}



// ===============================
// BIBLIOTECA
// ===============================

function pegarBiblioteca(){

    return JSON.parse(

        localStorage.getItem(
            "biblioteca"
        )

    ) || [];

}

function adicionarBiblioteca(id){

    let biblioteca = pegarBiblioteca();

    if(!biblioteca.includes(id)){

        biblioteca.push(id);

        localStorage.setItem(

            "biblioteca",

            JSON.stringify(biblioteca)

        );

    }

}

function removerBiblioteca(id){

    let biblioteca = pegarBiblioteca();

    biblioteca = biblioteca.filter(

        item => item != id

    );

    localStorage.setItem(

        "biblioteca",

        JSON.stringify(biblioteca)

    );

}



// ===============================
// HISTÓRICO DE LEITURA
// ===============================

function salvarLeitura(id,capitulo){

    let historico = {

        manga:id,

        capitulo:capitulo,

        data:new Date().toLocaleString()

    };

    localStorage.setItem(

        "ultimaLeitura",

        JSON.stringify(historico)

    );

}

function pegarUltimaLeitura(){

    return JSON.parse(

        localStorage.getItem(

            "ultimaLeitura"

        )

    );

}



// ===============================
// PESQUISA
// ===============================

function pesquisar(texto){

    texto = texto.toLowerCase();

    return mangas.filter(

        manga =>

        manga.nome

        .toLowerCase()

        .includes(texto)

    );

}



// ===============================
// CRIAÇÃO DE CARD
// ===============================

function criarCard(manga){

    let id;
    let nome;
    let genero;
    let capa;

    // MangaDex
    if (manga.attributes){

        id = manga.id;

        const titulo = manga.attributes.title || {};

        nome =
            titulo["pt-br"] ||
            titulo.en ||
            Object.values(titulo)[0] ||
            "Sem título";

        genero = (manga.attributes.tags || [])
            .filter(tag => tag.attributes.group === "genre")
            .map(tag =>
                tag.attributes.name["pt-br"] ||
                tag.attributes.name.en ||
                Object.values(tag.attributes.name)[0]
            )
            .join(", ");

        const cover = manga.relationships?.find(
            rel => rel.type === "cover_art"
        );

        if(cover?.attributes?.fileName){

            capa =
            `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`;

        }else{

            capa = "img/sem-capa.jpg";

        }

    }

    // Dados locais
    else{

        id = manga.id;
        nome = manga.nome;
        genero = manga.genero;
        capa = manga.capa || "img/sem-capa.jpg";

    }

    return `

<div class="card animar">

<img
src="${capa}"
alt="${nome}"
loading="lazy"
onerror="this.src='img/sem-capa.jpg'"
>

<h3>${nome}</h3>

<p>${genero}</p>

<a href="manga.html?id=${id}">

<button>

📖 Ler

</button>

</a>

</div>

`;

}
