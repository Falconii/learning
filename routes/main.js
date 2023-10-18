const { Readable } = require('stream');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const readline = require('readline');

const multerConfig = multer();

router.post('/api/loadfile', multerConfig.single('file'), async function(req, res) {

    try {

        const file = req;
        const buffer = file;

        const readableFile = new Readable();

        readableFile.push(buffer);
        readableFile.push(null);

        const dadosLine = readline.Interface({
            input: readableFile
        });

        for await (let line of dadosLine) {
            console.log(line);
        }

        console.log(req.file.buffer.toString('utf-8'));

        res.status(200).json({ fieldname: req.file.fieldname, originalname: req.file.originalname });

    } catch (err) {

        res.status(500).json({ erro: 'BAK-END', tabela: 'UPLOAD', message: err.message });

    }
});

module.exports = router;