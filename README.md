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
