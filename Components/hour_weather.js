import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, FlatList, View, Image } from 'react-native';

export default function Hour_weather({lon, lat}) {
    const [data, setData] = useState();
    const [min_temp, setMinTemp] = useState(0);
    const [max_temp, setMaxTemp] = useState(0);
    const hours = 24
    useEffect(() => {
      (async () => {
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: lat, lon: lon, hours: hours},
            headers: {
                'X-RapidAPI-Key': 'ee16de5810msha97ceb3dfd05d48p1fffabjsn722c4e3f236f',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          })
          .then(res => {
              const dat = res.data.data
              console.log(dat);
              setData(dat)
              setMinTemp(dat[0].temp)
              setMaxTemp(dat[0].temp)
          })
          .catch(err => {
              console.dir(err);
          })
      })()
      
    }, [lat,lon])
    for (let i in data){
      let cur_temp = Math.round(data[i].temp)
      if  (cur_temp > max_temp){
        setMaxTemp(cur_temp)
      }
      else if (cur_temp < min_temp) {
        setMinTemp(cur_temp)
      }
    }
    function addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    }
    function getTime(epoch) {
      const d = new Date(epoch * 1000)
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      return h + ":" + m;
    }
    const Item = ({ time, temp, icon }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{getTime(time)}</Text>
        <Image style={styles.iconWeather} source={{uri: "https://www.weatherbit.io/static/img/icons/"+icon+".png"}}></Image> 
        <Text style={styles.title}>{Math.round(temp)}°</Text>
      </View>
    );
    // if (data)
    //   // console.log(data[0].weather.icon);
    //   console.log("https://www.weatherbit.io/static/img/icons/"+data[0].weather.icon+".png");
    
    const renderItem = ({ item }) => (
      <Item style={styles.item} time={item.ts} temp={item.temp} icon={item.weather.icon}/>
    );
    return (
      <View style={styles.hourlyWeather}>
        <Text style={styles.minMaxText}>{`Min ${min_temp} °C / Max ${max_temp} °C`}</Text>
        <FlatList
        style={styles.flatlist}
        numColumns={hours}
        data={data} 
        renderItem={renderItem} 
        keyExtractor={item => item.ts}/>
      </View>
    )
}

const styles = StyleSheet.create({
  minMaxText: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    fontWeight: '500',
  },
  item: {
    marginRight: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  flatlist: {
    maxWidth: 240,
    overflowX: 'auto',
  },
  iconWeather: {
    height: 32,
    width: 32
  },
  title: {
    color: 'white'
  },
  hourlyWeather: {
    alignItems: 'center'
  }
});