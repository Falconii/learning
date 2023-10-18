const uploaddata = require('../data/uploadData');
const parse = require('../shared/ParseCSV');
const fs = require("fs");
const readline = require('readline');

exports.create = async(req, res) => {
    let centro_custos = [];
    let grupos = [];
    let produtos = [];
    let imobilizados = [];
    let principal = [];
    let ct = 0;
    let nro_linha = 0;
    let result = { "message": "Processamento OK" };
    const { name } = req.body;
    const file = req.file;
    var dadosPlanilha = readline.createInterface({
        input: fs.createReadStream(file.path)
    });

    for await (let linha of dadosPlanilha) {
        nro_linha++;
        if (nro_linha > 1) {
            const campos = parse.ParseCVS("", linha, ";");
            if (campos.length != 34) {
                console.log('Nro Linha: ', nro_linha, 'QTD  CAMPOS ==>', campos.length);
                result = { "message": "Processamento Com Erro!" };
            }
            //centro de custo
            ct = 0;
            const idx_cc = centro_custos.findIndex(cc => {
                return cc.cod_cc.trim() == campos[10].trim();
            });
            if (campos[10].trim() !== "" && idx_cc == -1) {
                ct++;
                centro_custos.push({ "idx": ct, "cod_cc": campos[10], "desc_cc": campos[11] });
                uploaddata.insertDraft(1, `${campos[10]}-${campos[11]}`, 'centro_custos');
            }
            result = centro_custos;
            //grupo 
            ct = 0;
            const idx_gr = grupos.findIndex(gr => {
                return gr.cod_grupo.trim() == campos[8].trim();
            });
            if (campos[8].trim() !== "" && idx_gr == -1) {
                ct++;
                grupos.push({ "idx": ct, "cod_grupo": campos[8], "desc_grupo": campos[9] });
                uploaddata.insertDraft(1, `${campos[8]}-${campos[9]}`, 'grupos');
            }
            //produtos 
            ct = 0;
            const idx_pro = produtos.findIndex(gr => {
                return gr.cod_produto.trim() == campos[1].trim();
            });
            if (campos[1].trim() !== "" && idx_pro == -1) {
                ct++;
                produtos.push({ "idx": ct, "cod_produto": campos[1], "desc_produto": campos[2] });
                uploaddata.insertDraft(1, `${campos[1]}-${campos[2]}`, 'produtos');
            }
            //principal 
            ct = 0;
            const idx_main = principal.findIndex(pr => {
                return pr.cod_produto.trim() == campos[4].trim();
            });
            if (campos[4].trim() !== "" && idx_main == -1) {
                ct++;
                principal.push({ "idx": ct, "cod_produto": campos[4], "desc_produto": campos[4] });
                uploaddata.insertDraft(1, `${campos[4]}-${campos[5]}`, 'principal');
            }
            //imobilizados
            ct = 0;
            const idx_mob = imobilizados.findIndex(imo => {
                return imo.cod_imobilizado.trim() == campos[6].trim();
            });
            if (campos[6].trim() !== "" && idx_mob == -1) {
                ct++;
                imobilizados.push({ "idx": ct, "cod_imobilizado": campos[6], "desc_imobilizado": campos[7] });
                uploaddata.insertDraft(1, `${campos[6]}-${campos[7]}`, 'imobilizados');
            }
        }
    }
    return result;
}

exports.createV2 = async(req, res) => {
    const { name } = req.body;
    const file = req.file;
    return { "message": "Deu Certo !!" };
}

exports.delete = async(req, res) => {
    try {
        console.log('Cheguei No Delete !');
        const { name } = req.body;
        const file = req.file;
        fs.unlinkSync(file.path);
        res.status(200).json({ 'message': 'Arquivo Excluído!', 'path': file.path })

    } catch (erro) {
        res.status(500).json({ 'message': erro.message });
    }
}