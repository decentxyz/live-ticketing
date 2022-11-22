var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyOEWl58SL2X5PEa'}).base('appDEjZhASr5BYZBX');

let matches = [];
const checkUnique = async (wallet) => {
  try {
    base('WavWRLD').select({
        fields: ["Wallet Address"],
        filterByFormula: `{Wallet Address} = '${wallet}'`, 
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
          matches.push(record.get('Wallet Address'))
        });  
        fetchNextPage();
        console.log(matches.length);
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  } catch (error) {
    console.error(error);
  }
}

checkUnique("0x264D8f2FBe7dEe399e012A509C7deEBc284b9937")