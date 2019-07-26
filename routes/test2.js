const router = module.exports = require('express').Router();
const path = require('path');
const { Worker, isMainThread } = require('worker_threads');


router.get('/:num', (req, res, next) => {
    if (isMainThread) {
        var num = req.params.num;
        const worker = new Worker(path.join(__dirname, '../services/test-workerthreads.js'), { workerData: { num: num || 0 } });

        // console.log(`Test2: run on threadId ... ${worker.threadId}`);

        worker.on('error', function (err) {
            return res.status(500).send(JSON.stringify(err));
        });

        worker.on('message', function (message) {
            let total = message;
            console.log(`Test2: Calculate total of ${num} ...`);
            return res.status(200).send(JSON.stringify(total));

        });
        worker.on('exit', function (code) {
            // console.log(`Worker stopped with exit code ${code} ${worker.threadId}`);
        });
    }

});