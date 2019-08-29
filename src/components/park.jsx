import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { MyMapComponent } from "./mapComponent";
import { Marker } from "react-google-maps";
// import { withRouter } from "react-router-dom";
import "./park.css";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


export default class Park extends Component {
    defaultData = [
        {
            id: 1,
            name: "sanewadi park",
            lat: 18.555200,
            lng: 73.804450,
            classes: ""
        },
        {
            id: 2,
            name: "Chondhe Park Aundh Pune",
            lat: 18.555380,
            lng: 73.810577,
            classes: ""
        },
        {
            id: 3,
            name: "Oval Garden Aundh Pune",
            lat: 18.563649,
            lng: 73.802818,
            classes: ""
        },
        {
            id: 4,
            name: "Baner Pashan Biodiversity Park Aundh Pune",
            lat: 18.552341,
            lng: 73.787886,
            classes: ""
        }

    ];

    state = {
        parkData: this.defaultData
    };


    constructor(props) {
        super(props);
    }


    handleMarkerClick = (e, id) => {
        this.updateSelection(id);
    }

    toggleActive = (e) => {
        this.updateSelection(e.target.id);
    }

    updateSelection(id) {
        this.state.parkData.map((park) => {
            if (id == park.id) {
                park.classes = "active";
            }
            else {
                park.classes = "";
            }
        }
        );
        this.updateState(this.state.parkData);
    };

    updateState(data) {
        this.setState({
            parkData: data
        })
    }

    searchChange = () => {
        this.defaultData.map((park) => park.classes = "");
        let searchStr = this.refs.searchtext.value;
        if (searchStr == "" || searchStr == null || searchStr == undefined) {
            this.updateState(this.defaultData);
        }
        else {
            let res = this.defaultData.filter(park => park.name.toLowerCase().includes(searchStr.toLowerCase()));
            this.updateState(res);
        }
    }

    render() {
        return (
            <section className="park-container">

                <div class="park-left-panel">
                    <input type='text' placeholder='Search park' ref="searchtext" onChange={this.searchChange} />
                    <span className='result-label'>{this.state.parkData.length} results</span>

                    {this.state.parkData.map((park) =>
                        <div className='' id={park.id} onClick={this.toggleActive} className={park.classes}>{park.name}</div>
                    )}
                </div>
                <div class="park-right-panel">
                    {/* <MyMapComponent
                        isOpen={true}
                        isMarkerShown={true}
                        markerData={this.state.parkData}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onMarkerClick={((e, id) => this.handleMarkerClick(e, id))}

                        onToggleOpen={(isOpen) => ({
                            isOpen: !isOpen,
                        })}
                    /> */}
                    <MyMapComponent
                        isOpen={true}
                        markerData={this.state.parkData}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    >
                        {true && this.state.parkData.map((marker) =>
                            <li>{<Marker position={{ lat: marker.lat, lng: marker.lng }} id={marker.id} onClick={((e) => this.handleMarkerClick(e, marker.id))} >
                                {
                                    marker.classes !== "" && <InfoBox
                                        onCloseClick={(isOpen) => ({
                                            isOpen: !isOpen,
                                        })}
                                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                                    >
                                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                                                {marker.name}
                                            </div>
                                        </div>
                                    </InfoBox>
                                }
                            </Marker>}</li>
                        )}
                    </MyMapComponent>

                </div>
            </section>
        );
    }
}


