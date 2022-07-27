import React, {useState, useCallback,useEffect} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

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
    borderBottomColor: '#333',
  },

  infoView: {
    alignItems: 'center',
  },

  cityCountryText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 40,
    color: 'white',
    marginVertical: 10,
   },
  minMaxText: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default function App() {

  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?q=Erevan&units=metric&appid=5fead154a24fd163986f5f280960869a`,
        })
        .then(res => {
            console.log(res.data);
            setData(res.data)
        })
        .catch(err => {
            console.dir(err);
        })
      }else {
        let location = await Location.getCurrentPositionAsync()
        
        axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=5fead154a24fd163986f5f280960869a`,
        })
        .then(res => {
            console.log(res.data);
            setData(res.data)
        })
        .catch(err => {
            console.dir(err);
        })
      }

      

    })()
    
  }, [])

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

  function background_image(clouds) {
    if (clouds == "few clouds") {
      return "sky.jpg"
    }
    else if (clouds == "clear sky") {
      return "clear.jpg"
    }
  }
  //Hello World
  const cur_img = background_image(data?.weather[0]["description"]);
  // const cur_img = 'sky.jpg'
  return (
    <View style={styles.root}>
      <ImageBackground  
        source={cur_img && require('./assets/' + cur_img)}
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
              <Text style={styles.dateText}>{new Date(data?.dt * 1000).toLocaleString()}</Text>
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




