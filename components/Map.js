import { useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react/dist/cloudinary-react";
import ReactMapGl, { Marker, PopUp, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const ref = useRef(null);


  const [latitude, setLatitude] = useState(35.6525);
  const [longitude, setLongitude] = useState(10.875);
  const [zoom, setZoom] = useState(10);

  
  return (
    <>
      <ReactMapGl
        temp
        style={{ position: "absolute", top: "0", left: "0",height:'100%',width:'100%' }}
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
        mapStyle="mapbox://styles/sahbikardi/claagrp27001g15pdhs7ma10y"
 
        mapboxAccessToken="pk.eyJ1Ijoic2FoYmlrYXJkaSIsImEiOiJjbGFhNWc2MnkwMmJ6M29xcjBycG4wdjZ0In0.nkiBqK5iqbrCndeN7ycN0Q"
        onMove={(e) => {
          setLatitude(e.viewState.latitude);
          setLongitude(e.viewState.longitude);
          setZoom(e.viewState.zoom);
       
        }}
      >
        <Marker longitude={10.875} latitude={35.6525}>
          <Image
            src={"https://img.icons8.com/color/48/000000/marker.png"}
            alt="marker"
          />
        </Marker>
      </ReactMapGl>
    </>
  );
}

export default Map;
