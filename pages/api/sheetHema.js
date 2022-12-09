import { GoogleSpreadsheet } from 'google-spreadsheet';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const doc = new GoogleSpreadsheet(
    '1Ck34-V-h9V_P8ifry8Nl-EE6MCLE3UTpWqv5i02miL4'
  );
  doc.useApiKey('AIzaSyBy6ehq85wmNULwq7s_LwaBIhGlaJW4oGk');

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const send = rows.map((row) => ({
    Date: row.Date,
    HDFC: row.HDFC,
  }));
  console.log(sheet.title);
  res.status(200).json(send);
}
