import { GoogleSpreadsheet } from 'google-spreadsheet';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const doc = new GoogleSpreadsheet(
    '1tPEFZVX168iYjgEAKlALnocLPsjqzIQsAaBMCbxgVFE'
  );
  doc.useApiKey('AIzaSyBy6ehq85wmNULwq7s_LwaBIhGlaJW4oGk');

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const send = rows.map((row) => ({
    Date: row.Date,
    Zerodha: row.Zerodha,
    Finvasia: row.Finvasia,
    Total: row.Total,
  }));
  console.log(sheet.title);
  res.status(200).json(send);
}
