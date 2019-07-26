const { workerData, parentPort, isMainThread } = require('worker_threads');

function sumTotal(num) {
    //console.log('isMainThread', isMainThread);
    var total = 0;
    for (var i = 0; i < num; i++) {
        total += i;
    }
    return total
}

parentPort.postMessage(sumTotal(workerData.num));