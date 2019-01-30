<template>
  <div id="watchedTagsBox" class="card text-center w-90">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Add Tag</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div v-show="!addtagActive" class="alltags">
        <h5 class="card-title">Watched Tags</h5>
        <button @click="filterByTag('*')" class="btn btn-sm btn-danger m-2">clear</button>
        <div v-for="tag in watchedTags">
          <button @click="filterByTag(tag)" class="btn btn-sm btn-primary m-2"> {{tag}}</button>
        </div>
      </div>  
      <div v-show="addtagActive" class="addtags">
        <form @submit.prevent="addWatchedTags" id="addTag">
          <input v-model="input" type="text" placeholder="add watched tag here...">
          <input href="#" class="btn btn-primary" type="submit" value="Add">
        </form>
        <p>{{message}}</p>
      </div>
    </div>
  </div>
</template>
<style>
  
</style>
<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      addtagActive : false,
      input: '',
      message: ''
    }
  },
  computed: mapState(['watchedTags']),
  methods: {
    filterByTag(tag) {
      this.$store.dispatch('FILTER_BY_TAG', tag);
    },
    addWatchedTags() {
      let self = this;
      let tags = this.input.trim().toLowerCase();
      this.$store.dispatch('UPDATE_WATCHED_TAGS', tags)
      .then(() => {
        self.input = '';
        self.message = 'updated your tags.';
        setTimeout(function() {
          self.message = '';
        }, 2000)
      })
    },
  },
  mounted() {
    console.log('====>')
    console.log(this.$store.state.watchedTags)
    let self = this;
    //register switch tab handler
    // console.log(this.watchedTags)
    $('#watchedTagsBox li a').click(function(e) {
      e.preventDefault();
      $('a').removeClass('active');
      $(this).addClass('active');
      self.addtagActive = !self.addtagActive;
    });
  }
}
</script>
