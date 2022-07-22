import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'Yerevan',
    lat: '0',
    lon: '0',
    callback: 'test',
    id: '2172797',
    lang: 'null',
    units: 'imperial',
    mode: 'xml'
  },
  headers: {
    'X-RapidAPI-Key': 'bbfa6d3cfcmsh8e24fb9b281ad48p1d060ajsndffc924d826b',
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

const d = new Date(1658420802*1000);
let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let time = h + ":" + m;
document.write(time);
