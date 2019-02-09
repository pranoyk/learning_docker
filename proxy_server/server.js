const app = require("express")();
const http = require("http");

let count = 0;

let hosts = [];

hosts.push(process.env.HOST_1);
hosts.push(process.env.HOST_2);

app.get("/", (req, res) => {
  let data = '';
  let port = process.env.PORT;
  if(count>1) count = 0;
  let options = {
    host: hosts[count],
    port: port,
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

app.listen(5000);