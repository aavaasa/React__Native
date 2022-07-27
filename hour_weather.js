import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
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
                'X-RapidAPI-Key': 'bc75dc7ba4mshf35a7e6feb0f063p19d85djsn5091bc0dce13',
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
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];
    return (
      <View>
        <Text style={styles.minMaxText}>{`Min ${min_temp} °C / Max ${max_temp} °C`}</Text>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    )
}