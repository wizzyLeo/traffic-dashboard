'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ type, source, destination, heatmapData }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        let map;
        let directionsService;
        let directionsDisplay;

        const loader = new Loader({
            apiKey: 'AIzaSyBGFyvqp623RCbrcPXoF43O_nFt3XHPeM0',
            version: 'weekly',
            libraries:['geometry', 'geocoding', 'drawing', 'places', 'visualization', 'routes']
        })

        async function initMap() {
            try {
                await loader.load();
                map = new google.maps.Map(mapRef.current, {
                    center: { lat: 25.0341, lng: 121.5640 },
                    zoom: 12,
                    styles: [
                        // Custom map styles here
                        // Example:
                        {
                          featureType: "all",
                          elementType: "all",
                          stylers: [
                            { invert_lightness: true },
                            { saturation: -100 },
                            { lightness: 0 },
                            { visibility: "on" },
                          ],
                        },
                        {
                            featureType: "transit", // Targeting the transit system
                            elementType: "all",
                            stylers: [
                              { invert_lightness: false }, // Not inverting lightness
                              { saturation: 50 },          // Adding some saturation
                              // Other stylers to customize the color and visibility of the transit layer
                            ],
                          },
                      ],
                });

                if (type === 'accident' && heatmapData) {
                    const heatmap = new google.maps.visualization.HeatmapLayer({
                        data: heatmapData.map(item => new google.maps.LatLng(item.lat, item.lng)),
                        map: map,
                    });
                }

                if (type === 'jam') {
                    const trafficLayer = new google.maps.TrafficLayer();
                    trafficLayer.setMap(map);
                }

                if (type === 'travel' && source && destination) {
                    directionsService = new window.google.maps.DirectionsService();
                    directionsDisplay = new window.google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                    let transitLayer = new google.maps.TransitLayer()
                    transitLayer.setMap(map)
                    let service = new google.maps.DistanceMatrixService();
                    getDirections(source, destination);
                }
            } catch (error) {
                console.error('Error loading Google Maps:', error);
            }
        }

        const getDirections = (source, destination) => {
            const request = {
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
            };
            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    let currentRoute = result;
                    directionsDisplay.setDirections(result);
                    var directionsResultDiv = document.getElementById("direction-box");
                    directionsResultDiv.innerHTML = "";
                    var directionsResultText = document.createElement("div");
                    directionsResultText.innerHTML = "<strong>Directions:</strong>";
                    directionsResultDiv.appendChild(directionsResultText);
                    var steps = result.routes[0].legs[0].steps;
                    for (var i = 0; i < steps.length; i++) {
                        var stepText = document.createElement("div");
                        stepText.innerHTML = "<div style='font-size: 0.9em'>" + steps[i].instructions + "</div>";
                        directionsResultDiv.appendChild(stepText);
                    }
                    directionsDisplay.setDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            });
        };

        initMap();

        return () => {
            // Cleanup code if necessary
        };
    }, [type, source, destination]);

    return (
        <div ref={mapRef} className="w-full h-full rounded-xl"></div>
        
    );
};

export default Map;
