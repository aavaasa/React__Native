import React, {useState, useCallback} from 'react';
import axios from 'axios';

import { 
  StyleSheet, 
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator, 
  View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 30,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: '300',
    borderRadius: 20,
    borderBottomColor: 'blue',
  },

  infoView: {
    alignItems: 'center',
  },

  cityCountryText: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 40,
    color: 'black',
    marginVertical: 10,
   },
  minMaxText: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: '5fead154a24fd163986f5f280960869a',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res => {
        console.log(res.data);
        setData(res.data);
    })
    .catch(err => {
        console.dir(err);
    })
    .finally(() => {
        setLoading(false);
    });
  }, [input, api.key]);

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={require('./assets/sky.jpg')}
        resizeMethod="cover"
        style={styles.image}>
          <View>
            <TextInput 
              placeholder = "Enter the city name"
              onChangeText = {text => setInput(text)}
              value = {input}
              placeholderTextColor = {'#000'}
              style = {styles.textInput}
              onSubmitEditing = {fetchDataHandler}
            />
          </View>
          {loading && (
            <View>
              <ActivityIndicator size={'large'} color={'#fff'} />
            </View>
          )}

          {data && (
            <View style={styles.infoView}>
              <Text style={styles.cityCountryText}>
                {`${data?.name}, ${data?.sys?.country}`}
              </Text>
              <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
              <Text style={styles.tempText}>{`${Math.round(
                data?.main?.temp,
              )} °C`}</Text>
              <Text style={styles.minMaxText}>{`Min ${Math.round(
                data?.main?.temp_min,
              )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            </View>
          )}
      </ImageBackground>
    </View>
  );
}



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
  var data = JSON.parse(response.data.split('(')[1].split(')')[0])
	console.log(data);
  const d = new Date(data["sys"]["sunrise"]*1000);
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;
  let temp = Math.round((data["main"]["feels_like"] - 32) * 5/9)
  document.write(time + "<br />");
  document.write("Temperature now is: " + temp)
}).catch(function (error) {
	console.error(error);
});

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

