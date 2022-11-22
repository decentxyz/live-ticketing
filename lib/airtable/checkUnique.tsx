var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

let matches:any = [];
const checkUnique = async (wallet:any) => {
  base('WavWRLD').select({
      fields: ["Wallet Address"],
      filterByFormula: `{Wallet Address} = '${wallet}'`, 
  }).eachPage(function page(records:any, fetchNextPage:any) {
      records.forEach(function(record:any) {  
        matches.push(record.get('Wallet Address'))
      });
      fetchNextPage();
      console.log('test',matches.length, wallet);
      return matches.length;
  }, function done(err:any) {
      if (err) { console.error(err); return; }
  });
}

export default checkUnique;