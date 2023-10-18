const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const uploadfileSrv = require("../services/LoadFileService");

router.post('/api/loadfile', upload.single("file"), async function(req, res) {

    try {

        const lsLista = await uploadfileSrv.create(req, res);

        res.status(200).json(lsLista);

    } catch (err) {

        res.status(500).json({ erro: 'BAK-END', tabela: 'UPLOAD', message: err.message });

    }
});

router.post('/api/loadfileV2', upload.single("file"), async function(req, res) {

    try {

        const lsLista = await uploadfileSrv.createV2(req, res);

        res.status(200).json(lsLista);

    } catch (err) {

        res.status(500).json({ erro: 'BAK-END', tabela: 'UPLOAD', message: err.message });

    }
});

router.delete('/api/loadfile', upload.single("file"), uploadfileSrv.delete);

module.exports = router;