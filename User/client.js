const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("utilisateur.proto",{});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const client = new userPackage.UserService("localhost:8000", grpc.credentials.createInsecure()
);

client.Insert({
    'id' : 1,
    'name' : 'samia',
    'age' : 24
}, (err,response)=>{

    console.log('Result insert' + JSON.stringify(response));
})



client.getById({'id':2}, function (err, response) {
    if (err) {
        console.log("Either ID or Username is invalid. Try again");
    } else {
        console.log(response.user);
    }
});

client.getAll({},(err,response) => {
    console.log('result get all ',JSON.stringify(response));
})
client.Delete({'id':1},(err,response) => {
    console.log('result  ',JSON.stringify(response));
})
