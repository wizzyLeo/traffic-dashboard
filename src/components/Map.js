'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ type, source, destination, heatmapData, setDirections }) => {
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
                    directionsDisplay.setDirections(result);
        
                    // Extracting the steps from the directions result
                    const steps = result.routes[0].legs[0].steps;
                    const directionSteps = steps.map(step => step.instructions);
        
                    // Use the setDirections prop to pass the steps back to the parent component
                    setDirections(directionSteps);
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
