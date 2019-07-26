const { workerData, parentPort, isMainThread } = require('worker_threads');

function sumTotal(from, to) {
    //console.log('isMainThread', isMainThread);
    var total = 0;
    for (var i = from; i < to; i++) {
        total += i;
    }
    return total
}

parentPort.postMessage(sumTotal(workerData.from, workerData.to));