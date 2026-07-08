export default async function handler(req, res) {

    const titulo = req.query.title;

    if (!titulo) {
        return res.status(400).json({
            erro: "Digite um título"
        });
    }

    try {

        const resposta = await fetch(
            "https://api.mangadex.org/manga?title=" +
            encodeURIComponent(titulo) +
            "&limit=10" +
            "&includes[]=cover_art"
        );

        const dados = await resposta.json();

        res.setHeader("Access-Control-Allow-Origin", "*");

        res.status(200).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: "Erro MangaDex"
        });

    }

}
