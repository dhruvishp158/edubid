import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";

const GetAddress = (props) => {
  //fetch api

  async function getStores() {
    const res = await fetch("/api/profile/address");
    const data = await res.json();
    // console.log(data);
    const stores = data.data.map((store) => {
      //   console.log(store);
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
      center: [-73.5745913, 45.4874488],
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
  }
  useEffect(() => {
    getStores();
  });

  return (
    <div className='container my-3'>
      <h1 className='display-4 text-center'>
        <i className='fas fa-map-marked mr-4'></i> Store Locator
      </h1>
      <Link to='/create-profile' className='btn btn-success mb-4'>
        Add Store
      </Link>
      <div
        id='map'
        style={{ width: "100%", height: "400px", borderRadius: "5px" }}
      ></div>
    </div>
  );
};

export default GetAddress;
