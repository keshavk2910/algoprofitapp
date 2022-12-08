import { google } from 'googleapis';
export async function getEmojiList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      'keshavk2910@gmail.com',
      null,
      'AIzaSyBy6ehq85wmNULwq7s_LwaBIhGlaJW4oGk',
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1tPEFZVX168iYjgEAKlALnocLPsjqzIQsAaBMCbxgVFE',
      range: 'Sheet1', // sheet name
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((row) => ({
        title: row[2],
        subtitle: row[3],
        code: row[4],
        browser: row[5],
        short_name: row[17],
        emojipedia_slug: row[18],
        descriptions: row[19],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
