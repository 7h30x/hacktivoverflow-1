import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    view: 'home',
    questions: [],
    filteredQuestions: [],
    currentQ : null,
    selectedQ : null,
    watchedTags: [],
    user :{
      signedIn : false,
      data : {
        name:'',
        userId:''
      }
    },
    token: localStorage.getItem('token')
  },
  mutations: {
    FILTER_Q(state,payload) {
      state.filteredQuestions = state.questions.filter(q => {
       return (q.title.toLowerCase().includes(payload) || q.description.toLowerCase().includes(payload)) ? true : false
      })
    },
    FILTER_BY_TAG (state,payload) {
      if(payload == '*') return state.filteredQuestions = state.questions;
      state.filteredQuestions = state.questions.filter(q => {
        return (q.tags.includes(payload)) ? true : false
       })
    },
    SET_TAGS (state, payload) {
      let watchedTags =  payload.filter(function (value, index, self) { 
        return self.indexOf(value) === index;
      });
      state.watchedTags = watchedTags;
    },
    SET_Q(state,payload) {
      state.questions = payload;
    },
    SET_FILTERED_Q (state,payload) {
      state.filteredQuestions = payload;
    },
    SET_USER_STATE(state, payload) {
      state.user = payload;
    },
    SET_SELECTED_Q (state,payload) {
      state.selectedQ = payload
    },
    SET_VIEW (state,payload) {
      state.view = payload
    }
  },
  actions: {
    SEARCH(context,payload) {
      let string = payload.trim().toLowerCase();
      context.commit('FILTER_Q', string)
    },
    FILTER_BY_TAG (context,tag) {
      context.commit('FILTER_BY_TAG', tag);
    },
    GET_Q(context, payload) {
      return new Promise((resolve,reject) => {
        axios({
          method:'GET',
          url:'http://localhost:3000/questions',
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(({data : {questions}}) => {
            context.commit('SET_Q', questions);
            context.commit('SET_FILTERED_Q', questions);
            resolve(); 
        })
        .catch(error => {
          reject(error);
        })
      })
    },
    USER_LOGIN(context,options) {
      return new Promise((resolve,reject) => {
        axios(options)
        .then( ({data}) => {
          // console.log(data)
          localStorage.setItem('token', data.token);
          context.commit('SET_USER_STATE', {
            signedIn : true,
            data: {
              name: data.user.name,
              userId : data.user.userId
            }
          });
          context.commit('SET_TAGS' , data.watchedTags);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      })
      
    },
    USER_REGISTER(context,options) {
      return new Promise((resolve,reject) => {
        axios(options)
        .then (data => {
          localStorage.setItem('token', data.token);
          context.commit('SET_USER_STATE', true);
        })
        .catch(error => {
          reject(error);
        })    
      })
      
    },
    UPDATE_WATCHED_TAGS (context, tags) {
      return new Promise((resolve,reject) => {
        axios({
          method:'PUT',
          url:'http://localhost:3000/users/updateWatchedTags',
          headers: {
            authorization: context.state.token 
          },
          data: {
            newTags: tags
          }        
        })
        .then(response => {
          console.log(response.data)
          context.commit('SET_TAGS',response.data.watchedTags);
          resolve();
        })
        .catch(error => {
          reject(error);
        })    
      })
    },
    SUBMIT_QUESTION (context, options) {
      return new Promise((resolve,reject) => {
        axios(options)
        .then (({data : {question}})=> {
          return context.dispatch('GET_Q')
        })
        .then(done => {
          resolve();
        })
        .catch(error => {
          reject(error);
        })    
      })
    },
    SUBMIT_ANSWER (context, options) {
      return new Promise((resolve,reject) => {
        axios(options)
        .then (({data: {question}})=> {
          context.commit('SET_SELECTED_Q', question);
          resolve();
        })
        .catch(error => {
          reject(error);
        })    
      })
    },
    UPDATE_ONE_Q (context, changes) {
      let data = context.state.selectedQ;
      if(changes =='up') {
        data.upvotes++;
      } else if (changes =='down') {
        data.downvotes++;
      } else if (typeof changes == Object ) {
        data = changes;
      }
      axios({
        method:'PUT',
        url:`http://localhost:3000/questions/${data._id}`,
        headers: {
          authorization: localStorage.getItem('token')
        },
        data
      })
      .then(({data : {question}}) => {
        context.commit('SET_SELECTED_Q', question);
      })
    },
    UPDATE_ONE_ANSWER (context, options) {

    },
    DELETE_ONE_Q (context, id) {
      console.log(id)
      return new Promise((resolve,reject) => {
        axios({
          method:'DELETE',
          url:`http://localhost:3000/questions/${id}`,
          headers: {
            authorization: localStorage.getItem('token')
          },
        })
        .then(() => {
          resolve(); 
        })
        .catch(error => {
          reject(error);
        })
      })
    }
  }
})
