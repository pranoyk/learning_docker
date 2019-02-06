const app = require("express")();
const pg = require("pg");
let connectionString = "postgresql://postgres:mypassword@data:5432/postgres";
const client = new pg.Client(connectionString);
client.connect().then(()=>{
  app.listen(3000,()=>{console.log("Listening...")});
}).catch(err=>console.log(err));

const doesTableExist = () => {
	client.query(`SELECT * FROM students`, (err, res) => {
		return err? true: false;
	})
};

app.get('/', (req, res) => {
	client.query(`SELECT * FROM students`)
		.then(resp=>{
			console.log(resp.rows);
		});
	res.send("Chal raha hai!!");
}
)

app.post('/info', (req, res) => {
	req.on('data',(data)=>{
		client.query(`INSERT INTO students VALUES (${data.toString()})`);
	})
	req.on('end', () => {
  		res.send("END");
	})
	}
)	

