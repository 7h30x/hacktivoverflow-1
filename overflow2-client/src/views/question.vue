<template>
  <div>
    <Modal id="editorModal" :q="q"></Modal>
    <div class="row">
      <div class="col-2 ml-3">
      </div>
      <div class="col-9 mb-3">
        <h1>{{q.title}}</h1>
        <span>asked : {{q.createdAt.slice(0,10)}} active: {{q.updatedAt.slice(0,10)}} </span>
        <div class="col-1" >
          <a href="#" data-toggle="modal" data-target="#editorModal" class="mr-5">edit</a>
          <a href="#" @click="deleteQ" >delete</a>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-2 pr-2 bg-light">
        <div class="flex-container flex-column">
          <a href="#" @click="voteQ('up')">
           <i class='fas fa-angle-up' style='font-size:48px'></i>
          </a>
            <h2>{{q.upvotes - q.downvotes}} </h2>
          <a href="#" @click="voteQ('down')">
            <i class='fas fa-angle-down' style='font-size:48px'></i>
          </a>
        </div>
      </div>
      <main class="col-8">
        <p >{{q.description}}
        </p>
      </main>
    </div>
    <div class="row">
      <div class="col-6 tags">
        <div v-for="tag in q.tags" style="display: inline-block">
          <span class="btn btn-sm btn-primary m-2"> {{tag}}</span>
        </div>
      </div>
     <div class="col-6">
       <span>share</span>
       <a href="#"><span id="editbtn">edit</span></a>
     </div>
    </div>
    <h2>{{q.answers.length}} Answers</h2>
    <hr>
    <div v-for="a in q.answers" class="row">
      <div class="col-2 pr-2 bg-light">
        <div class="flex-container flex-column">
          <a href="#" @click="voteA('up')">
            <i class='fas fa-angle-up' style='font-size:48px'></i>
          </a>
            <h2>{{a.upvotes - a.downvotes}} </h2>
          <a href="#" @click="voteA('down')">
            <i class='fas fa-angle-down' style='font-size:48px'></i>
          </a>
        </div>
      </div>
      <main class="col-8">
        {{a.description}}
      </main>
      <hr>
    </div>
    <Editor :q=q></Editor>
  </div>    
</template>
<script>
import {mapState} from 'vuex';
import Editor from '@/components/answereditor';
import Modal from '@/components/editorModal';
export default {
  name:'editor',
  components: {
    Editor , Modal
  },
  data() {
    return {
      questionId : this.$route.params.questionId
    }
  },
  computed: {
    q: function() {
        return this.$store.state.selectedQ
    },
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.resetQ();
    this.setQ();
  },
  methods: {
    deleteQ() {
      let self = this;
      this.$store.dispatch('DELETE_ONE_Q', this.questionId)
      .then(() => {
        self.$store.commit('SET_VIEW', 'home');
        self.$router.push('/');
      })
    },
    home () {
      this.$router.push('/');
    },
    setQ() {
      let self = this;
        let found = self.$store.state.questions.filter(q => {
          return q._id == self.questionId
        });
        self.$store.commit('SET_SELECTED_Q', found[0]);
        return found[0];
    },
    resetQ() {
      this.$store.commit('SET_SELECTED_Q', null);
    },
    voteQ(direction) {
      this.$store.dispatch('UPDATE_ONE_Q', direction)
    },
     voteA(direction) {
      this.$store.dispatch('UPDATE_ONE_A', direction)
    },
    checkQuestionOwner(id) {
      return id == this.user.data.userId;
    }
  }
}
</script>
<style scoped>
*{
  text-align: justify;
}
  main {
    min-height: 300px;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
