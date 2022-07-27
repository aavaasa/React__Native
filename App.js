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
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res => {
        console.log(res.data);
        setData(res.data);
        setCurImg(background_image(res.data.weather[0]["description"]));
    })
    .catch(err => {
        console.dir(err);
    })
    .finally(() => {
        setLoading(false);
    });
  }, [input, api.key, data]);

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
    else if (clouds == "broken clouds") {
      return "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/625a747a-061b-477d-958f-a0d6cea9e4cb/dax9bd4-dd0da73d-5b6e-415c-b05e-19471f366e5a.jpg/v1/fill/w_1024,h_768,q_75,strp/broken_clouds_by_kevintheman_dax9bd4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvNjI1YTc0N2EtMDYxYi00NzdkLTk1OGYtYTBkNmNlYTllNGNiXC9kYXg5YmQ0LWRkMGRhNzNkLTViNmUtNDE1Yy1iMDVlLTE5NDcxZjM2NmU1YS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.2HBtScMyydNDUe606gk2Jd8RHs6iM-76feSI7Dc3sLw"
    }
    else if (clouds == "scattered clouds") {
      return "https://img.freepik.com/premium-photo/blue-sky-background-with-fluffy-cumulus-clouds-illuminated-by-setting-sun-panorama-white-fluffy-clouds-blue-sky-beautiful-vast-blue-sky-with-amazing-scattered-cumulus-clouds_295890-3396.jpg?w=360"
    }
    else {
      return "https://www.minten-walter.de/files/public/images/AdobeStock_121270629.jpg"
    }
  }
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
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
          {data && (
            <View style={styles.infoView}>
              <Text style={styles.cityCountryText}>
                {`${data?.name}`}
              </Text>
              <Text style={styles.dateText}>Last updated at: {time}</Text>
              <Text style={styles.tempText}>{`${Math.round(
                data?.main?.temp,
              )} °C`}</Text>
               <Hour_weather lon={data.coord.lon} lat={data.coord.lat}/>
            </View>
          )}
      </ImageBackground>
    </View>
  );
}




