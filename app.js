window.mockLoc = [
    {
        lat:25.0567117,
        lng:121.5621091
    },
	{
        lat:25.059494,
        lng:121.5558181
    },
]

window.mockRoutes = [
    [
        {
            lat: 25.0567207,
            lng: 121.56210820000001
         },
         {
            lat: 25.056679,
            lng: 121.5606507
         },
         {
            lat: 25.0597061,
            lng: 121.56037800000001
         },
         {
            lat: 25.059559,
            lng: 121.55822609999996
         },
         {
            lat: 25.0597553,
            lng: 121.55812590000005
         },
         {
            lat: 25.0596326,
            lng:121.5567939
         },
         {
            lat: 25.0596481,
            lng: 121.55671630000006
         },
         {
            lat: 25.059494,
            lng: 121.5558181
         }
    ],
    [
        {
            lat: 25.0567207,
            lng: 121.56210820000001
        },
        {
           "lat": 25.0582898,
           "lng": 121.56103469999994
        },
        {
           "lat": 25.0582857,
           "lng": 121.56050519999997
        },
        {
           "lat": 25.0597061,
           "lng": 121.56037800000001
        },
        {
           "lat": 25.059559,
           "lng": 121.55822609999996
        },
        {
           "lat": 25.0597553,
           "lng": 121.55812590000005
        },
        {
           "lat": 25.0596326,
           "lng": 121.5567939
        },
        {
           "lat": 25.0596481,
           "lng": 121.55671630000006
        },
        {
           "lat": 25.059494,
           "lng": 121.5558181
        }
     ]
]

window.mockStore = [
    {
        lat: 25.058205695941695,
        lng: 121.56104251099487
    },
    {
        lat: 25.057972439325248,
        lng: 121.55927225304504
    },
    {
        lat: 25.05717790564333,
        lng: 121.55866207357712
    },
    {
        lat: 25.058560439528662,
        lng: 121.55996964277756
    },
    {
        lat: 25.059187312671003,
        lng: 121.55834422411453
    }
]

window.mockDangerous = [
    {
        lat: 25.0565864,
        lng: 121.55589
    },
    {
        lat: 25.057696,
        lng: 121.5552422
    },
    {
        lat: 25.0582836,
        lng: 121.55545
    },
    {
        lat: 25.0588285,
        lng: 121.5611792
    }
]

var map;
var markHome;
var markSchool;
var markStores;
var markDangerous;
var directionsDisplay;
var directionsService;

var redraw = function(payload) {
    lat = payload.message.lat;
    lng = payload.message.lng;

    map.setCenter({
        lat: lat, 
        lng: lng, 
        alt: 0
    });
    mark.setPosition({
        lat: lat, 
        lng: lng, 
        alt: 0
    });
};

var renderRoute = function(pFrom, pEnd) {
    var start = pFrom;
    var end = pEnd;
    var request = {
        origin:start,
        destination:end,
        waypoints: [{
              location: mockStore[2],
              stopover: true
            },
        ],
        travelMode: google.maps.DirectionsTravelMode.WALKING,
    };
    var j = 0;
    var colors = ['green', '#FF0000'];
    mockRoutes.forEach(mockRoute => {
        var route = new google.maps.Polyline({
            path: mockRoute,
            geodesic: true,
            strokeColor: colors[j],
            strokeOpacity: 0.75,
            strokeWeight: 4
        });
        route.setMap(map);
        j += 1;
        //console.log(i)
    });

    directionsService.route(request, function(response, status) {
        //alert(status);
        if (status == google.maps.DirectionsStatus.OK) {
            //console.log(JSON.stringify(response));
            directionsDisplay.setDirections(response);
            var steps = response.routes[0].legs[1].steps //[0].steps
            var latlngs = [];
            steps.forEach(step => {
                latlngs.push(step.start_location);
            });
            latlngs.push(mockLoc[1])

            console.log(JSON.stringify(latlngs))

            /*var route = new google.maps.Polyline({
                path: mockRoute,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 4
            });
      
            route.setMap(map);*/
        }
    });
}

var initialize = function() {
    map  = new google.maps.Map(
        document.getElementById('map-canvas'), {
            center:{
                lat: mockLoc[0].lat,
                lng: mockLoc[0].lng,
            },
            zoom:16
        }
    );
    markHome = new google.maps.Marker({
        position: {
            lat: mockLoc[1].lat, 
            lng: mockLoc[1].lng,
        }, 
        map:map,
        icon: {
            url: "./FuelYellow/icon-01.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        },
    });
    markSchool = new google.maps.Marker({
        position: {
            lat: mockLoc[0].lat, 
            lng: mockLoc[0].lng,
        }, 
        map:map,
        icon: {
            url: "./FuelYellow/icon-02.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        },
    })
    markStores = []
    mockStore.forEach(store => {
        markStores.push(
            new google.maps.Marker({
                position: {
                    lat: store.lat, 
                    lng: store.lng,
                }, 
                map:map,
                icon: {
                    url: "./FuelYellow/icon-03.png", // url
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                },
            })
        )
    });
    markDangerous = []
    mockDangerous.forEach(dangerous => {
        markDangerous.push(
            new google.maps.Marker({
                position: {
                    lat: dangerous.lat, 
                    lng: dangerous.lng,
                }, 
                map:map,
                icon: {
                    url: "./FuelYellow/icon-07.png", // url
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                },
            })
        )
    })

    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        preserveViewport: true,
        draggable: true,
    });
    directionsService = new google.maps.DirectionsService;
    renderRoute(mockLoc[0], mockLoc[1]);
};

window.initialize = initialize;

// AIzaSyDK9saeGuVZfvkypwMVlKPWbiLWzo4tXhg
// AIzaSyAhlO7uJrpuF5w4AY_f0rcqzng589Mnwhc
