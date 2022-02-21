<template>
    <div>
        <div style="margin:0 auto; align:center">
            
            <hr>
            <h1>My coordinates</h1>
            <p>{{ MyCoordinates.lat }} Latitude, {{ MyCoordinates.lng }} Longitude</p>
            <hr>
            <button class="btn-sm btn-success" style="margin: 0 5px" @click="ShowInMap()">Show My coordinates</button>
            <button class="btn-sm  btn-primary">Show My Last coordinates</button>
            <hr>
           
            <h1>Map Showing {{ status }} coordinates</h1>
            <p>{{ MapCoordinates.lat }} Latitude, {{ MapCoordinates.lng }} Longitude</p>

            <GmapMap
                :center="MapShowCoordinates"
                :zoom="zoom"
                style="width:80%; height:360px; margin:auto"
                ref="mapRef"
                @dragend="handleDrag"
            >
            </GmapMap>
            <p style="font-size:10px">Map showing your last coordinates</p>

            <h1>Last Set coordinates</h1>
            <p>{{ LastCoordinates.lat }} Latitude, {{ LastCoordinates.lng }} Longitude</p>

        </div>
    </div>
</template>
<script>

export default {
    data() {
      
      return {

          map: null, 
          zoom: 7,
          MyCoordinates: {
              lat: 0,
              lng: 0
          },

          LastCoordinates: {
              lat: 0,
              lng: 0
          },

          MapShowCoordinates: {
              lat: 0,
              lng: 0
          },

          status:'pending'

      }
    },

    methods : {

        ShowInMap(){

            // set map coordinates to my coordinate
            this.MapShowCoordinates = this.MyCoordinates;

            // set showing to current
            this.status = 'Current'
            
            // save as last coordinates
            let center = {
                lat: this.MyCoordinates.lat,
                lng: this.MyCoordinates.lng
            };

            let zoom = this.map.getZoom()

            localStorage.center = JSON.stringify(center);
            localStorage.zoom = zoom;
        },


        /// current coordinates methods
        getLocation() {
             this.$getLocation({})
            .then((coordinates) => {
                this.MyCoordinates = coordinates
            })
            .catch((error) => alert(error)); 
        },


        //last coordinate method
        getLastLocation(){

             // check for center in local storage
            if(localStorage.center) {
                this.MapShowCoordinates = JSON.parse(localStorage.center); //load in map
                this.LastCoordinates = JSON.parse(localStorage.center); // show below the map
            }

            // check for zoom in local storage
            if(localStorage.zoom) {
                this.zoom = JSON.parse(localStorage.zoom);
            }
        },


        handleDrag() {
            let center = {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            };

            let zoom = this.map.getZoom()

            localStorage.center = JSON.stringify(center);
            localStorage.zoom = zoom;
        }
    },

    created() {
        
        /// load current coordinaates on top 
        this.getLocation();
       
       /// load LAst coordinaates on MAP 
        this. getLastLocation();

    },

    /// runs after vue component loaded
    mounted() {
        this.$refs.mapRef.$mapPromise.then(map =>this.map = map);
    },




    computed: {
        MapCoordinates() {
            if(!this.map) {
                return {
                    lat: 0,
                    lng: 0
                }
            }

            return {
              lat: this.map.getCenter().lat().toFixed(4),
              lng: this.map.getCenter().lng().toFixed(4)
            }
        }
    }


}
</script>
