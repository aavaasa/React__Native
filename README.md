# React__Native

import React, {useEffect} from "react"
import * as Location from 'expo-location';

useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("+65+65");
        return
      }

      let location = await Location.getCurrentPositionAsync()
      console.log(location.coords.latitude, location.coords.longitude);
    })()
  }, [])
  
  23a0f3df7cmsh88700f05e662e09p1d081ajsna5531e8b61a8
