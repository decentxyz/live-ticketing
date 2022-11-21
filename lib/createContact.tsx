var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}).base('appDEjZhASr5BYZBX');

const createContact = async (wallet:any, email:string, phoneNumber:string) => {
  base('WavWRLD').create({
    "Wallet Address": wallet,
    "Email": email,
    "Phone Number": phoneNumber,
    "Event": "wavWRLD_ Miami 2022"
  }, {typecast: true}, function(err:any, record:any) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record?.getId());
  });
}

export default createContact;