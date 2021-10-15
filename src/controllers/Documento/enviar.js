const { value, toCompare, sendError } = require("../../functions");
const { Documento, Marcador } = require("../../models");

module.exports = async (req, res) => {
    try {   
        value.paramsNull(req.body);
        toCompare.keys(["title", "description", "tags"], req.body);

        /**
         * Declara uma variavel para receber os marcadores.
         * Recebe no type String, e transforma no type Array através do Spit
         *
         */
        var marcadores = req.body.tags;
        marcadores = marcadores.split(",");

        /**
         * Validação e normalização das tags passada pelo cliente.
         * Faz a validação individual atraves do forEach, verificando caracters irregulares e, ou, vazios.
         *
         */
        marcadores.forEach((element) => {
            value.hasCharSpacial(element);
            if (!value.isNull(element))
                marcadores[marcadores.indexOf(element)] = element
                    .toString()
                    .toLowerCase()
                    .trim();
        });

        /**
         *  Verifica no banco de dados, mongoDB, se há tags cujo os nomes já existam.
         *  Retornar um array contendo todos os dados das tags já cadastradas.
         *
         */

        let query = await Marcador.find({
            name: { $exists: true, $in: marcadores },
        });

        /**
         * Se a variavel query retornar vazia ele processa uma coisa, mas se conter algo ela processa outra.
         * Se não for vazia ela insere todos as tags passada pela requisição.
         * Mas se conter, a função retira os que já estavam cadastrado e cadastras os novos.
         * Depois da resposta do DB, mescla com os dados da que existiam.
         * Finalizando com a anexação no Documento.
         *
         */
        if (!value.isNull(query)) {
            /**
             * Elimina do array todos as tags que já forem cadastradas.
             *
             */
            query.forEach((element) => {
                marcadores = marcadores.filter((e) => !(e == element.name));
            });

            /**
             *  Manipula e transforma em associativo associando cada tag a um Nome.
             *  Esse processo facilita na hora de inserir no MoongoDB.
             *
             */
            marcadores.forEach((element) => {
                marcadores[marcadores.indexOf(element)] = { name: element };
            });

            /**
             *  Faz o insert de varias novas tags.
             *  Processa e manipula a lista de Tags para ser anexada.
             *
             */
            let regristed = await Marcador.insertMany(marcadores);

            /**
             * Encontra a posição da tag e substitue pelo novo valor no array.
             * Atualiza a lista de tags.
             *
             */
            query.forEach((element) => {
                query[query.indexOf(element)] = {
                    name: element.name,
                    _id: element._id,
                };
            });

            /**
             * Inseri as novas tags com as já existente.
             * E filtra as informações para ser anexada ao documento.
             *
             */
            regristed.forEach((element) => {
                query.push({
                    name: element.name,
                    _id: element._id,
                });
            });

        } else {
            /**
             *  Manipula e transforma em associativo associando cada tag a um Nome.
             *  Esse processo facilita na hora de inserir no MoongoDB.
             *
             */
            marcadores.forEach((element) => {
                marcadores[marcadores.indexOf(element)] = { name: element };
            });

            /**
             * Faz a inserção de todas as novas, filtra e insere no Array query.
             * 
             */
            var registres = await Marcador.insertMany(marcadores);
            registres.forEach((element) => {
                query.push({
                    name: element.name,
                    _id: element.id,
                });
            });
        }


        /**
         * Faz a validação dos input.
         * Valida e normaliza os texto.
         * 
         */
        value.checkSize(
            req.body.title.trim(),
            "titulo",
            process.env.TITLE_MIN_SIZE,
            process.env.TITLE_MX_SIZE
        );
        value.checkSize(
            req.body.description,
            "descrição",
            process.env.DESC_MIN_SIZE,
            process.env.DESC_MAX_SIZE
        );

        value.hasCharSpacial(req.body.title);
        value.hasCharSpacial(req.body.description);

        var upload = await Documento.create({
            title: req.body.title.trim(),
            description: req.body.description,
            postedBy: {
                _id: req.headers["user"]._id,
                name: req.headers["user"].name,
            },
            name: req.file.originalname,
            key: req.file.filename,
            size: req.file.size,
            tags : query,
        });
        res.json({
            status: true,
            _id: upload._id,
        });
    } catch (erro) {
        console.log(erro);
        sendError(res, erro);
    }
};
