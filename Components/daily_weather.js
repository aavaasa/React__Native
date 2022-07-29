import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, FlatList, View, Image } from 'react-native';

export default function Day_weather({lon, lat}) {
    const [data, setData] = useState();
    const [min_temp, setMinTemp] = useState(0);
    const [max_temp, setMaxTemp] = useState(0);
    const hours = 7
    useEffect(() => {
      (async () => {
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
            params: {lat: lat, lon: lon, hours: hours},
            headers: {
                'X-RapidAPI-Key': 'f9b1643effmsh279fde709356ae0p1828f9jsn1b54b158f403',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          })
          .then(res => {
              const dat = res.data.data.slice(0, 7)
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
    function getWeekDay(day) {
        if (new Date().getDay() != day) {
            if (day == "0") {
                return "Sunday"
            }else if(day == "1") {
                return "Monday"
            }else if(day == "2") {
                return "Tuesday"
            }else if(day == "3") {
                return "Wednesday"
            }else if(day == "4") {
                return "Thursday"
            }else if(day == "5") {
                return "Friday"
            }else if(day == "6") {
                return "Saturday"
            }
        } else {
            return 'Today'
        }
    }
    const Item = ({ day, min_temp, max_temp, icon }) => (
      <View style={styles.item}>
        <Text style={[styles.day, styles.title]}>{getWeekDay(new Date(day).getDay())}</Text>
        <Image style={styles.iconWeather} source={{uri: "https://www.weatherbit.io/static/img/icons/"+icon+".png"}}></Image> 
        <Text style={styles.title}>{Math.round(max_temp)}°/{Math.round(min_temp)}°</Text>
      </View>
    );
    // if (data)
    //   // console.log(data[0].weather.icon);
    //   console.log("https://www.weatherbit.io/static/img/icons/"+data[0].weather.icon+".png");
    
    const renderItem = ({ item }) => (
      <Item style={styles.item} day={item.datetime} min_temp={item.min_temp} max_temp={item.max_temp} icon={item.weather.icon}/>
    );
    return (
      <View style={styles.hourlyWeather}>
        <FlatList
        style={styles.flatlist}
        // numColumns={hours}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatlist: {
    maxWidth: 240,
    overflowX: 'auto',
    position: 'relative',
    width: '100%'
  },
  iconWeather: {
    height: 32,
    width: 32
  },
  title: {
    color: 'white',
  },
  day: {
    minWidth: 70
  },
  hourlyWeather: {
    alignItems: 'center',
    width: '100%'
  }
});