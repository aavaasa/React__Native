import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, FlatList, View } from 'react-native';

const styles = StyleSheet.create({
  minMaxText: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default function Hour_weather({lon, lat}) {
    const [data, setData] = useState();
    const [min_temp, setMinTemp] = useState(0);
    const [max_temp, setMaxTemp] = useState(0);
    useEffect(() => {
      (async () => {
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: lat, lon: lon, hours: '24'},
            headers: {
                'X-RapidAPI-Key': '76a2f36ccbmshc0de947df3fb7cbp1a95cfjsn195edb2f51e4',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          })
          .then(res => {
              console.log(res.data.data);
              setData(res.data.data)
              setMinTemp(res.data.data[0].temp)
              setMaxTemp(res.data.data[0].temp)
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
    const Item = ({ time, temp }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{getTime(time)} {Math.round(temp)}</Text>
      </View>
    );
    
    const renderItem = ({ item }) => (
      <Item time={item.ts} temp={item.temp}/>
    );
    return (
      <View>
        <Text style={styles.minMaxText}>{`Min ${min_temp} °C / Max ${max_temp} °C`}</Text>
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.ts}/>
      </View>
    )
}