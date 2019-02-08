const app = require("express")();
const pg = require("pg");
let connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);
client.connect().then(()=>{
  app.listen(3000,()=>{console.log("Listening...")});
}).catch(err=>console.log(err));

app.get('/', (req, res) => {
	client.query(`CREATE TABLE IF NOT EXISTS students(name VARCHAR)`);
	client.query(`SELECT * FROM students`)
		.then(resp=>{
			console.log(resp.rows);
		});
	res.send("Chal raha hai!!");
}
);

app.post('/info', (req, res) => {
	req.on('data',(data)=>{
		client.query(`INSERT INTO students VALUES (${data.toString()})`);
		console.log(data.toString());
	});
	req.on('end', () => {
  		res.send("END");
	})
	}
)	;

