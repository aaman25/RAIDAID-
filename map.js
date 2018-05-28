       
          var mapApp = angular.module('mapApp', []);
          mapApp.controller('MapController', ['$scope', '$http','$interval',function ($scope,$http, $interval,$timeout) {
            $interval(work,1000);
   var x = 0;
          function work(){
              $http({
  method: 'get',
  url: 'display.php'
 }).then(function successCallback(response) {

    $scope.names = response.data;
      
    
      if(x != $scope.names.length)
      {
     for (i = x; i < $scope.names.length;++i)
          {
                 
                  
                   createMarker($scope.names[i]);
                   x++;              
          }
      }
 });
}

         


    
              var mapOptions = {
                  zoom:4.9,
                  center: new google.maps.LatLng(22,80),
                   animation: google.maps.Animation.DROP,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              

$scope.delete = function (item) {
    $scope.markers.splice(item, 1);
       
}



              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lo, info.lat),
                       animation: google.maps.Animation.DROP,
                      lat: info.lo,
                      long:info.lat

                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.lo +  ' N, </div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      var latlng = new google.maps.LatLng(marker.lat, marker.long);
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            infoWindow.setContent('<h2>' + results[1].formatted_address + '</h2> ' + 
                        marker.long +', '+marker.lat);
                            //alert("Location: " + results[1].formatted_address );
                        }
                    }
                });

                  
                     $scope.map.setZoom(14);
                   
                                                     
     $scope.map.center = marker.position;
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              
          




              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

          }]);
