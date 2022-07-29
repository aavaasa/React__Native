import React, {useState, useCallback,useEffect} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import Hour_weather from './Components/hour_weather';
import Day_weather from './Components/daily_weather';

import { 
  StyleSheet, 
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator, 
  View,
  SafeAreaView,
  Image } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [cur_img, setCurImg] = useState("https://www.minten-walter.de/files/public/images/AdobeStock_121270629.jpg");
  const [icon, setIcon] = useState("")
  const [time, setTime] = useState()
  const [sunrise, setSunRise] = useState()
  const [sunset, setSunSet] = useState()
  const [timezone, setTimezone] = useState()
  const api = {
    key: '5fead154a24fd163986f5f280960869a',
  };
  const api2 = {
    key: 'f9b1643effmsh279fde709356ae0p1828f9jsn1b54b158f403'
  }
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  function getTime(d) {
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let time = h + ":" + m;
    return time
  }
  function background_image(clouds,curTime,curSunRise,curSunSet) {
    if (curTime > curSunRise && curTime < curSunSet) {
    if (clouds == "few clouds") {
      return "https://media.istockphoto.com/photos/clear-blue-sky-background-picture-id508544168?b=1&k=20&m=508544168&s=170667a&w=0&h=WOYrVNi63gep7VdTc3mc9mbYCWoJ9_hraSqnAf5-9TU="
    }
    else if (clouds == "clear sky") {
      return "https://www.minten-walter.de/files/public/images/AdobeStock_121270629.jpg"
    }
    else if (clouds == "overcast clouds") {
      return "https://cdnb.artstation.com/p/marketplace/presentation_assets/000/385/415/large/file.jpg?1590347735"
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
  }else {
    if (clouds == "few clouds") {
      return "https://t3.ftcdn.net/jpg/02/53/01/04/360_F_253010444_pRv8FN70ORAOZxthRVUOGFT81QJgBqtq.jpg"
    }
    else if (clouds == "clear sky") {
      return "https://media.istockphoto.com/photos/night-sky-with-stars-picture-id826672506?k=20&m=826672506&s=170667a&w=0&h=j5Ut603tgUp-LzwE2Yk5Pp8oJPU6yLWzHUzRvMvI7kQ="
    }
    else if (clouds == "overcast clouds") {
      return "https://images.unsplash.com/photo-1611944674436-a170fbcaa773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3VkeSUyMG5pZ2h0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    }
    else if (clouds == "broken clouds") {
      return "https://videos.clipstock.com/s3fs-public/styles/video_thumbnail/public/preview-thumbnails/ce3cb6a1-2e7a-4aa9-adb0-9573d58c3ee4.thumbnail.jpg?VersionId=qI8f0dZ_6myTCrMoo_b8gKjMfkaQ27G4&itok=E6YzRgFo"
    }
    else if (clouds == "scattered clouds") {
      return "https://videos.clipstock.com/s3fs-public/styles/video_thumbnail/public/preview-thumbnails/fb3630e4-d279-4e3e-b4d8-1377d5d3a847.thumbnail.jpg?VersionId=SWAPZiyISe24497A5jy4mMV2uakRtK5f&itok=Fiz1siPp"
    }
    else {
      return "https://media.istockphoto.com/photos/night-sky-with-stars-picture-id826672506?k=20&m=826672506&s=170667a&w=0&h=j5Ut603tgUp-LzwE2Yk5Pp8oJPU6yLWzHUzRvMvI7kQ="
    }
  }
  }
  useEffect(() => {
    (async () => {
      setLoading(true)
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        axios({
          method: 'GET',
          url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
          params: {lon: '44.5058', lat: '40.1985'},
          headers: {
            'X-RapidAPI-Key': api2.key,
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
          }
        })
        .then(res => {
            const dat = res.data.data[0]
            console.log(dat);
            const timeZoneStr = new Date().toLocaleString("en-US", { timeZone: dat.timezone });
            const real_time = new Date(timeZoneStr)
            setTime(getTime(real_time))
            setIcon(dat.weather.icon)
            setTimezone(dat.timezone);
        })
        .catch(err => {
            console.dir(err);
        })
        if (timezone && time) {
        axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?lat=40.1985&lon=44.5058&units=metric&appid=${api.key}`,
        })
        .then(res => {
            console.log(res.data);
            let ts1 = res.data.sys.sunrise
            let timeZoneStr1 = new Date(ts1 * 1000).toLocaleString("en-US", { timeZone: timezone });
            let real_time1 = new Date(timeZoneStr1)
            let ts2 = res.data.sys.sunset
            let timeZoneStr2 = new Date(ts2 * 1000).toLocaleString("en-US", { timeZone: timezone });
            let real_time2 = new Date(timeZoneStr2)
            setSunRise(getTime(real_time1))
            setSunSet(getTime(real_time2))
            setData(res.data);
            setCurImg(background_image(res.data.weather[0]["description"], time, getTime(real_time1), getTime(real_time2)));
        })
        .catch(err => {
            console.dir(err);
        })
        .finally(() => {
          setLoading(false)
        })
      }
      }else {
        let location = await Location.getCurrentPositionAsync()
        axios({
          method: 'GET',
          url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
          params: {lon: location.coords.longitude, lat: location.coords.latitude},
          headers: {
            'X-RapidAPI-Key': api2.key,
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
          }
        })
        .then(res => {
            const dat = res.data.data[0]
            console.log(dat);
            let timeZoneStr = new Date().toLocaleString("en-US", { timeZone: dat.timezone });
            const real_time = new Date(timeZoneStr)
            setTime(getTime(real_time))
            setIcon(dat.weather.icon)
            setTimezone(dat.timezone);

        })
        .catch(err => {
            console.dir(err);
        })
        if (timezone) {
        axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${api.key}`,
        })
        .then(res => {
            console.log(res.data);
            let ts1 = res.data.sys.sunrise
            let timeZoneStr1 = new Date(ts1 * 1000).toLocaleString("en-US", { timeZone: timezone });
            let real_time1 = new Date(timeZoneStr1)
            let ts2 = res.data.sys.sunset
            let timeZoneStr2 = new Date(ts2 * 1000).toLocaleString("en-US", { timeZone: timezone });
            let real_time2 = new Date(timeZoneStr2)
            setSunRise(getTime(real_time1))
            setSunSet(getTime(real_time2))
            setData(res.data);
            setCurImg(background_image(res.data.weather[0]["description"], time, getTime(real_time1), getTime(real_time2)));
        })
        .catch(err => {
            console.dir(err);
        })
        .finally(() => {
          setLoading(false)
        })
      }
      }

    })()
    
  }, [timezone])
  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res1 => {
        console.log(res1.data);
        setData(res1.data);
        axios({
          method: 'GET',
          url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
          params: {lon: res1.data.coord.lon, lat: res1.data.coord.lat},
          headers: {
            'X-RapidAPI-Key': api2.key,
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
          }
        })
        .then(res => {
            const dat = res.data.data[0]
            console.log(dat);
            let timeZoneStr = new Date().toLocaleString("en-US", { timeZone: dat.timezone });
            const real_time = new Date(timeZoneStr)
            let time = getTime(real_time)
            let ts1 = res1.data.sys.sunrise
            let timeZoneStr1 = new Date(ts1 * 1000).toLocaleString("en-US", { timeZone: dat.timezone });
            let real_time1 = new Date(timeZoneStr1)
            let ts2 = res1.data.sys.sunset
            let timeZoneStr2 = new Date(ts2 * 1000).toLocaleString("en-US", { timeZone: dat.timezone });
            let real_time2 = new Date(timeZoneStr2)
            setTime(time)
            setIcon(dat.weather.icon)
            setSunRise(getTime(real_time1))
            setSunSet(getTime(real_time2))
            setCurImg(background_image(res1.data.weather[0]["description"], time, getTime(real_time1), getTime(real_time2)));
        })
        .catch(err => {
            console.dir(err);
        })
    })
    .catch(err => {
        console.dir(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [input, api.key]);
  return (
    <SafeAreaView>
      <ImageBackground  
        source={{uri: cur_img}}
        resizeMode={'cover'}>
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
              <View style={styles.divIcon}>
                <Image style={styles.weatherIcon} source={icon && {uri: "https://www.weatherbit.io/static/img/icons/"+icon+".png"}}></Image>
                <Text style={styles.tempText}>{`${Math.round(
                  data?.main?.temp,
                )}°`}</Text>
              </View>
               <Hour_weather lon={data.coord.lon} lat={data.coord.lat}/>
               <Day_weather lon={data.coord.lon} lat={data.coord.lat}/>
               <View
                style={{
                  border: '1px solid rgb(0, 0, 0, 0.1)',
                  width: '100%',
                }}
              />
               <View style={styles.sunDiv}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.title}>Sunrise</Text>
                  <Image style={styles.sunIcon} source={{uri: "https://cdn-icons-png.flaticon.com/512/7774/7774377.png"}}></Image>
                  <Text style={styles.title}>{sunrise}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.title}>Sunset</Text>
                  <Image style={styles.sunIcon} source={{uri: "https://cdn-icons.flaticon.com/png/512/2918/premium/2918204.png?token=exp=1659064922~hmac=9459c3bfcf1785a5db705d5a3a59a267"}}></Image>
                  <Text style={styles.title}>{sunset}</Text>
                </View>
               </View>
            </View>
          )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold'
  },
  sunDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  sunIcon: {
    width: 32,
    height: 32
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
  weatherIcon: {
    width: 55,
    height: 55,
  },
  divIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});




