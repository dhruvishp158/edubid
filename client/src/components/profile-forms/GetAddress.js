import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import Direction from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
const GetAddress = (props) => {
  async function getStores() {
    const res = await fetch("/api/profile/address");
    const data = await res.json();

    console.log(data);
    const stores = data.data2.map((store) => {
      console.log(store);
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1],
          ],
        },
        properties: {
          _id: store._id,
          title: store.location.formattedAddress,
          icon: "town-hall",
          // icon: <img src={`http://localhost:3000/${store.profilePicture}`} />,
        },
      };
    });
    loadMap(stores);
  }

  function loadMap(stores) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGhydXZpc2hwMTU4IiwiYSI6ImNrYThwcmZ2YzBpeXUyc214OTQzeGM1dzQifQ.uX47FkHW1FU9z4NsWUBxbQ";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 14,
      // center: [-73.5745913, 45.4874488],
      center: [-73.58227, 45.49269],
    });

    map.on("load", function () {
      map.loadImage(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
        function (error, image) {
          if (error) throw error;
          map.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: stores,
            },
          });
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "point",
            layout: {
              "icon-image": "{icon}-15",
              "icon-size": 1,
              "text-field": "{title}",
              "text-offset": [0, 0.9],
              "text-anchor": "top",
            },
          });
        }
      );
    });
    map.addControl(
      new Direction({
        accessToken: mapboxgl.accessToken,
      }),
      "top-left"
    );
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
  useEffect(() => {
    getStores();
  });

  return (
    <div>
      <Link
        to='/dashboard'
        className='btn btn-light'
        style={{ margin: "1rem" }}
      >
        Go Back
      </Link>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 className='display-4 text-center'>
          <i className='fas fa-map-marked mr-4'></i> TEACHER LOCATOR
        </h1>

        <div
          id='map'
          style={{ width: "100%", height: "670px", borderRadius: "5px" }}
        ></div>
      </div>
    </div>
  );
};

export default GetAddress;
