const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("calculator.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;

const server = new grpc.Server();

server.bind('localhost:8000',grpc.ServerCredentials.createInsecure());
server.addService(calculatorPackage.Calculator.service,{

    'Addition' : Addition,
    'Subtraction': Subtraction,
    'Multiplication' : Multiplication,
    'Division' : Division
});
server.start();



function Addition (call, callback){

    const ResultResponse= {


        'result' : call.request.firstNumber + call.request.secondNumber
    }
    callback(null, ResultResponse);
}

function Subtraction(call, callback){

    const ResultResponse= {


        'result' : call.request.firstNumber - call.request.secondNumber
    }
    callback(null, ResultResponse);
}
function Multiplication(call, callback){

    const ResultResponse= {


        'result' : call.request.firstNumber * call.request.secondNumber
    }
    callback(null, ResultResponse);
}
function Division(call, callback){


    if(call.request.firstNumber == 0) {
        console.log('error division')
    }
    else{
        const ResultResponse= {


            'result' : call.request.firstNumber / call.request.secondNumber
        }
        callback(null, ResultResponse);
    }
}

