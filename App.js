import React, {useState, useCallback,useEffect} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import Hour_weather from './hour_weather';

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
  const [cur_img, setCurImg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true)
      setCurImg('')
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?q=Erevan&units=metric&appid=5fead154a24fd163986f5f280960869a`,
        })
        .then(res => {
            console.log(res.data);
            setData(res.data);
            setCurImg(background_image(res.data.weather[0]["description"]));
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
            setData(res.data);
            setCurImg(background_image(res.data.weather[0]["description"]));
        })
        .catch(err => {
            console.dir(err);
        })
      }

      setLoading(false)
    })()
    
  }, [])

  const api = {
    key: '5fead154a24fd163986f5f280960869a',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };
  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    setCurImg('')
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res => {
        console.log(res.data);
        setData(res.data);
        setCurImg(background_image(data?.weather[0]["description"]));
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
      return "https://media.istockphoto.com/photos/clear-blue-sky-background-picture-id508544168?b=1&k=20&m=508544168&s=170667a&w=0&h=WOYrVNi63gep7VdTc3mc9mbYCWoJ9_hraSqnAf5-9TU="
    }
    else if (clouds == "clear sky") {
      return "https://www.minten-walter.de/files/public/images/AdobeStock_121270629.jpg"
      // return "https://cdnb.artstation.com/p/marketplace/presentation_assets/000/385/415/large/file.jpg?1590347735"
    }
    else if (clouds == "overcast clouds") {
      return "https://cdnb.artstation.com/p/marketplace/presentation_assets/000/385/415/large/file.jpg?1590347735"
      // return "https://www.minten-walter.de/files/public/images/AdobeStock_121270629.jpg"
    }
  }
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  console.log(cur_img);
  //Hello World
  // const cur_img = background_image(data?.weather[0]["description"]);
  const d = new Date(data?.dt * 1000);
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;
  // const cur_img = 'sky.jpg'
  return (
    <View style={styles.root}>
      <ImageBackground  
        source={cur_img && {uri: cur_img}}
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
          <Hour_weather />
          {data && (
            <View style={styles.infoView}>
              <Text style={styles.cityCountryText}>
                {`${data?.name}`}
              </Text>
              <Text style={styles.dateText}>Last updated at: {time}</Text>
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




