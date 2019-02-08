const app = require("express")();
const http = require("http");

let count = 0;

let hosts = [];
let ports = [];

hosts.push(process.env.HOST_1);
hosts.push(process.env.HOST_2);
ports.push(process.env.PORT_1);
ports.push(process.env.PORT_2);

app.get("/", (req, res) => {
  let data = '';
  if(count>1) count = 0;
  let options = {
    host: hosts[count],
    port: ports[count],
    path: '/'
  };
  http.get(options, function(resp){
    resp.on('data', function(chunk){
      data = chunk.toString();
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
  count++;
  console.log(data,count);
  res.send(data);
});

app.post("/info", (req, res) => {
  let data = '';
  if(count>1) count = 0;
  let options = {
    host: hosts[count],
    port: ports[count],
    path: '/info',
    method: 'POST',
  };
  req.on('data',(data)=> {
    options.body = data.toString();
    console.log("=============>",options);
    let request = http.request(options);
    request.on('connect', (response, socket) => {
      socket.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    });
  });
  req.on('end', () => {
    console.log(data);
    count++;
    res.send(data);
  })
});

app.listen(5000);