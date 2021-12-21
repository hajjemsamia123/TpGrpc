const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("utilisateur.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const server = new grpc.Server();

server.bind('localhost:8000',grpc.ServerCredentials.createInsecure());
server.addService(userPackage.UserService.service,{

    'Insert' : Insert,
    'getAll' : getAll,
    'getById' : getById,
    'Delete': Delete

});
server.start();
const todos = [];
const user = require('./user').user;
function Insert (call, callback){

    const User= {


        'id' : todos.length + 1,
        'name' : call.request.name,
        'age': call.request.age
    }

    todos.push(User);
    callback(null, User);
}
function getAll (call, callback){



    callback(null,{ 'users': todos  });

}
function getById(call, callback){

    const id = call.request.id;
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === id) {
            callback(null, {user: user[i]});
            return;
        }else{
            //error response on server side informing id tried
            console.log("Invalid ID tried: "+ call.request.id);
        }
    }

    callback('Invalid Id');
}
function Delete(call, callback){


    const id = call.request.id;
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === id) {
            console.log("deleteId: "+ call.request.id);
            user.splice('id',1)
            callback(null, {});
            return;
        }
    }
}
