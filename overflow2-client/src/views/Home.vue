<template>
  <div class="home">
    <Nav></Nav>
    <div v-if="view == 'home'" class="container">
      <div class="row">
        <div class="col-left col-lg-8 col-12">
          <h1>Top Questions</h1>
          <hr class="mt-2 mb-2">
          <QCard></QCard>
        </div>  
        <div class="col-right col-3">
          <WatchedTags></WatchedTags>
        </div>  
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>

</template>
<style scoped>
  .container {
    background-color: rgb(255, 249, 240);
    min-height: 99vh;
    min-width: 99vw; 
    padding: 0px 0px;
    margin: 0px 0px;
  }
  .col-right {
    height: auto;
  } 
  h1{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
  }
</style>

<script>
import {mapState} from 'vuex';

// @ is an alias to /src
import Nav from '@/components/navbar.vue'
import WatchedTags from '@/components/watchedtags.vue'
import QCard from '@/components/questioncard.vue'
export default {
  name: 'home',
  components: {
    Nav, WatchedTags, QCard
  },
  computed: mapState(['view', 'user']),
  mounted() {
    function checkUserState() {
     ( this.user.signedIn == false) ? this.$router.push('/login') : null;
    };
  }
}
</script>
