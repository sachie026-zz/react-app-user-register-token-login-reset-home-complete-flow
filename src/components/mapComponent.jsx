import React from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// export const MyMapComponent = withGoogleMap((props) =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// )


import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


// onToggleOpen = ({ isOpen }) => () => ({
//     isOpen: !isOpen,
// })


export const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 18.553686, lng: 73.806810 }}
    >
        {props.children}
        {/* {props.isMarkerShown && <Marker position={{ lat: props.markerData[0].lat, lng: props.markerData[0].lng }} />} */}
    </GoogleMap>
))

// export default MyMapComponent;
