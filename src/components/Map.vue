<template>
    <div>
        <div style="margin:0 auto; align:center">
            <h1>My coordinates</h1>
            <p>{{ MyCoordinates.lat }} Latitude, {{ MyCoordinates.lng }} Longitude</p>

            <h1>Map coordinates</h1>
            <p>{{ MapCoordinates.lat }} Latitude, {{ MapCoordinates.lng }} Longitude</p>
       
            
            <GmapMap
                :center="MyCoordinates"
                :zoom="zoom"
                style="width:80%; height:360px; margin:auto"
                ref="mapRef"
                @dragend="handleDrag"
            >
            </GmapMap>
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

      }
    },

    created() {
        

        // check for center in local storage
        if(localStorage.center) {
            this.MyCoordinates = JSON.parse(localStorage.center);
        }else{

            this.$getLocation({})
            .then((coordinates) => {
                this.MyCoordinates = coordinates
            })
            .catch((error) => alert(error)); 

        }

         // check for zoom in local storage
        if(localStorage.zoom) {
            this.zoom = JSON.parse(localStorage.zoom);
        }

    },

    /// runs after vue component loaded
    mounted() {
        this.$refs.mapRef.$mapPromise.then(map =>this.map = map);
    },


    methods : {
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
