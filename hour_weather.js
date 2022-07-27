import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import { View } from 'react-native';

export default function Hour_weather() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const api = {
        key: "bbfa6d3cfcmsh8e24fb9b281ad48p1d060ajsndffc924d826b"
    }
    useEffect(() => {
      (async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: '40.1811', lon: '44.5136', hours: '24'},
            headers: {
                'X-RapidAPI-Key': 'bbfa6d3cfcmsh8e24fb9b281ad48p1d060ajsndffc924d826b',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          })
          .then(res => {
              console.log(res.data);
              setData(res.data.data)
          })
          .catch(err => {
              console.dir(err);
          })
        }else {
          let location = await Location.getCurrentPositionAsync()
          
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: location.coords.latitude, lon: location.coords.longitude, hours: '48'},
            headers: {
                'X-RapidAPI-Key': 'bbfa6d3cfcmsh8e24fb9b281ad48p1d060ajsndffc924d826b',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
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
    return (
        <View>

        </View>
    )
}