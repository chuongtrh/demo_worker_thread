const router = module.exports = require('express').Router();

router.get('/:num', (req, res, next) => {
    var num = req.params.num;
    var total = 0;
    for (var i = 0; i < num; i++) {
        total += i;
    }
    console.log(`Test1: Calculate total of ${num} ...`);
    return res.status(200).send(JSON.stringify(total));
});

