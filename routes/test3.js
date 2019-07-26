const router = module.exports = require('express').Router();
const path = require('path');
const Pool = require('worker-threads-pool')
const pool = new Pool({ max: 3 })

router.get('/:num', (req, res, next) => {
    var num = req.params.num;
    var segment = num / 5;
    var taskList = [];
    for (var i = 0; i < 5; i++) {
        var from = segment * i;
        var to = from + segment;
        taskList.push(countWithWorker(from, to));
    }
    Promise.all(taskList)
        .then(results => {
            let total = results.reduce((a, b) => a + b, 0);
            console.log(`Test3: Calculate total of ${num} ...`);

            return res.status(200).send(JSON.stringify(total));
        })
        .catch(err => next(err));
});

const countWithWorker = (from, to) => {
    return new Promise((resolve, reject) => {
        pool.acquire(path.join(__dirname, '../services/test-workerthreads2.js'), { workerData: { from: from, to: to } }, function (err, worker) {
            if (err) {
                return reject(err);
            }
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on('exit', function (code) {
            })
        })
    });
};