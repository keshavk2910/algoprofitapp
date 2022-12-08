import RoboChart from '@postlight/react-google-sheet-to-chart';

export default function Home() {
  return (
    <RoboChart
      id='1tPEFZVX168iYjgEAKlALnocLPsjqzIQsAaBMCbxgVFE'
      sheet='Sheet1'
      token='AIzaSyBy6ehq85wmNULwq7s_LwaBIhGlaJW4oGk'
      title='Algorithmic Trading Results'
      type='bar'
      xsuffix='s'
      colors={['#ff5722', '#990055', '#000']}
    />
  );
}
