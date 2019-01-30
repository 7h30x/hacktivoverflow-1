<template>
  <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="#">Overflow</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav nav-tabs mr-auto">
        <li class="nav-item ml-2">
          <a @click="home" class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class=" nav-link" @click="askQuestion" href="#">
            Ask Question
            <i class="fa fa-plus-square-o"></i>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">User</a>
          <div class="dropdown-menu">
            <a @click="logout" class="dropdown-item" href="#">Log out</a>
          </div>
        </li>
      </ul>
      <form @submit.prevent="searchQ" class="form-inline my-2 my-lg-0">
        <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search questions..." aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
 </nav>
</template>
<style scoped>
  nav {
    color: rgb(29, 24, 24);
    width: 99vw;
  }
 
  .nav-item.active {
    background-color: rgb(67, 80, 80);
  }
  .form-control {
    height: 50px;
    width: 400px;
  }
</style>
<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      search :''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('SET_USER_STATE', false);
      this.$router.push('/login');
    },
    askQuestion() {
      this.$router.push('/ask');
      this.$store.commit('SET_VIEW', 'ask');
    },
    home() {
      this.$router.push('/');
      this.$store.commit('SET_VIEW', 'home');
    },
    searchQ() {
      this.$store.dispatch('SEARCH', this.search);
    }
  },
  computed: mapState(['view']),
  mounted() {
    let self = this;
    $('nav li a').click(function(e) {
      e.preventDefault();
      $('a').removeClass('active');
      $(this).addClass('active');
    });
  }
}
</script>


