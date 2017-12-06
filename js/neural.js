const mathjs = require('mathjs');

function random(){
    return(Math.random() * 2 -1);
}
function init_weight(n_inputs){
    var wgt =[];
    while(n_inputs > 0){
        wgt.push([random()])
        n_inputs--;
    }
    return(mathjs.matrix(wgt));
}

function train(inputMatrix){
    var ts_inputs = [[0, 0, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1]];
    var ts_outputs = mathjs.transpose([[0, 0, 0, 1, 1]]);
    var sigmoid = x => {
        x = mathjs.transpose(x);
        var f = x => {
            return(1/(1 + Math.exp(-x)))
        };
        x = x.map(f);
        return x;
    };

    var i = 0;
    while (i < 10000) {
        var hiddenLayer = mathjs.multiply(ts_inputs,weightMatrix);
        var output = mathjs.transpose(sigmoid(hiddenLayer));
        var error = mathjs.subtract(ts_outputs,output);
        var d_sig = mathjs.dotMultiply(output,mathjs.subtract(1,output));
        var val = mathjs.dotMultiply(error,d_sig);
        var correction = mathjs.multiply(mathjs.transpose(ts_inputs), val);
        //console.log(correction);
        weightMatrix = mathjs.add(weightMatrix,correction);
        i++;
    }
    var te = mathjs.multiply(inputMatrix,weightMatrix)
    console.log(sigmoid(te));
}
var un_input = [[1,1,0]];
var weightMatrix = init_weight(mathjs.size(un_input)[1]);
train(un_input,weightMatrix);
