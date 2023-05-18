var fs = require ('fs');
fs.appendFile('mynewfile.csv',form ,function(err) {
    if (err) throw err;
    console.log('Saved!');
});