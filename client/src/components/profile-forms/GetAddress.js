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
          name: store.user.name,
          profile: `http://localhost:3000/${store.profilePicture}`,
          bio: store.bio,
          icon: "town-hall",
          // icon: <img src={`http://localhost:3000/${store.profilePicture}`} />,
        },
      };
    });
    loadMap(stores);
  }

  function loadMap(stores) {
    console.log(stores);
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
              "icon-size": 2,
              "text-field": "{name}",
              "text-offset": [0, 0.9],
              "text-anchor": "top",
              "icon-allow-overlap": true,
            },
          });
          // Create a popup, but don't add it to the map yet.
          var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          map.on("mouseenter", "points", function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = "pointer";

            var coordinates = e.features[0].geometry.coordinates.slice();
            var bio = e.features[0].properties.bio;
            var address = e.features[0].properties.title;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup
              .setLngLat(coordinates)
              .setHTML(`<div>${address}</div>` + `<div>${bio}</div>`)
              .addTo(map);
            // popup.setLngLat(coordinates).setHTML(bio).addTo(map);
          });

          map.on("mouseleave", "points", function () {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });
        }
      );
    });
    var layerList = document.getElementById("menu");
    var inputs = layerList.getElementsByTagName("input");

    function switchLayer(layer) {
      var layerId = layer.target.id;
      map.setStyle("mapbox://styles/mapbox/" + layerId);
    }

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }
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
      <span>
        <Link
          to='/dashboard'
          className='btn btn-light'
          style={{ marginTop: "1rem" }}
        >
          Go Back
        </Link>
      </span>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <h1 className='display-4 text-center'>
          <i className='fas fa-map-marked mr-4'></i> TEACHER LOCATOR
        </h1>

        <div
          id='map'
          style={{
            width: "100%",
            height: "670px",
            borderRadius: "5px",
          }}
        ></div>
        <div id='menu'>
          <div className='forMap'>
            <div style={{ textAlign: "center" }}>
              <input
                id='streets-v11'
                type='radio'
                name='rtoggle'
                value='streets'
              />
              <label for='streets-v11' style={{ padding: "1rem" }}>
                streets
              </label>
            </div>
            <div>
              <input id='light-v10' type='radio' name='rtoggle' value='light' />
              <label for='light-v10' style={{ padding: "1rem" }}>
                light
              </label>
            </div>
            <div>
              <input id='dark-v10' type='radio' name='rtoggle' value='dark' />
              <label for='dark-v10' style={{ padding: "1rem" }}>
                dark
              </label>
            </div>
            <div>
              <input
                id='outdoors-v11'
                type='radio'
                name='rtoggle'
                value='outdoors'
              />
              <label for='outdoors-v11' style={{ padding: "1rem" }}>
                outdoors
              </label>
            </div>
            <div>
              <input
                id='satellite-v9'
                type='radio'
                name='rtoggle'
                value='satellite'
              />
              <label for='satellite-v9' style={{ padding: "1rem" }}>
                satellite
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAddress;
