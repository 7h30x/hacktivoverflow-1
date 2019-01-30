<template>
<div>
     <div v-for="el in filteredQuestions"  class=" row pt-5 pb-5">
      <div class="col-1 mr-2">
        <h3 class="disabled">{{el.answers.length}}</h3>
        <p>answers</p>
      </div>
      <div class="col-1">
        <h3 class="disabled">{{Number(el.upvotes) + Number(el.downvotes)}}</h3>
        <p>votes</p>
      </div>
      <div @click="questionActive(el._id)" class=' question-box col-5' >
        <h2>{{el.title}}</h2>
        <div class='row flex-container'>
          <div v-for="tag in tags" class="col-2 mt-2 tags flex-item ">
            <button class="btn btn-primary btn-sm">{{tag}}</button>
          </div>
        </div>
      </div>
      <div class="col-2">
        <p>asked on : {{el.createdAt.slice(0,10)}}</p>
        <p>by: {{el.userId}}</p>
      </div>
      
    </div>
  
</div>
  
</template>
<style scoped>
.question-box {
  margin: 10px 0;
}
.question-box:hover {
  cursor: pointer;
  border-bottom: solid 1px rgb(255, 152, 152);
  background-color: rgba 0,0,0,0.9;

}
  .tags {
    justify-content: flex-start;
  }
</style>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      tags: ['hello', 'hello'],
    }
  },
  computed: mapState(['filteredQuestions','user']),
  methods: {
    questionActive(el_id) {
      this.$store.commit('SET_VIEW','question');
      this.$router.push(`/question/${el_id}`);
    }
    
  },
  mounted() {
    console.log('sdfdsfds')
    let self = this;
     this.$store.dispatch('GET_Q')
  }  
}
</script>
