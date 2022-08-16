let { bech32 } = require('bech32')
let address = bech32.decode('cosmos15uv6hx0a6khw45fj29cavrxvfenq7z03qc7lra')
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const chain = 'neta'
const csvWriter = createCsvWriter({
    path: `../${chain}-to-juno.csv`,
    header: [
      {id: 'address', title: 'address'},
      {id: 'amount', title: 'amount'}
    ]
  });
var data = []

console.log(bech32.encode('juno', address.words))
console.log(bech32.encode('osmo', address.words))
console.log(bech32.encode('stars', address.words))
console.log(bech32.encode('cosmos', address.words))

// const writableStream = fs.createWriteStream();

fs.createReadStream(`../${chain}.txt`)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    let address = bech32.decode(row[0])
    const junoAddress = bech32.encode("juno", address.words)
    // console.log(junoAddress);
    data.push({
        address: junoAddress, 
        amount: 300
    }) 
  })
  .on("end", function () {
    // console.log(data);
    csvWriter.writeRecords(data).then(()=> console.log('The CSV file was written successfully'));
  })
  .on("error", function (error) {
    console.log(error.message);
  });

// console.log(bech32.encode('secret', address.words))
//osmo15uv6hx0a6khw45fj29cavrxvfenq7z03grd040
//evmos16y7tuecsw7qu9twe4nhwe70vh2e505vs3q3c8j
//secret1lcqy8slje37mzwq53v6nht8ysqvmmvsrdwhqa9

//expected
//juno15uv6hx0a6khw45fj29cavrxvfenq7z03k2ayyp


//stargaze tools

//howl juno, alpha.howl