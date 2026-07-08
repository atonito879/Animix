export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const titulo = req.query.title?.trim();

    if (!titulo) {
        return res.status(400).json({
            erro: "Digite um título"
        });
    }

    try {
        const resposta = await fetch(
            "https://api.mangadex.org/manga?" +
            new URLSearchParams({
                title: titulo,
                limit: "10"
            }).toString() +
            "&includes[]=cover_art"
        );

        if (!resposta.ok) {
            return res.status(resposta.status).json({
                erro: "Erro ao consultar a API do MangaDex"
            });
        }

        const dados = await resposta.json();

        return res.status(200).json(dados);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro ao consultar o MangaDex"
        });
    }
}
