<template>
  <div>
    <!--editor-->
    <form @submit.prevent="submit" id="editorForm" class="flex-container d-flex flex-column justify-content-left">
      <label> Title
        <input v-model="editor.title" type="text">
      </label> 
      <label>
        Body
        <div id="editor" ref="editor"></div>
      </label>
      <label> Tags
        <input v-model="editor.tags" type="text" placeholder="eg. node.js vue networking">
      </label>
      <div>
        <input  type="submit" class="btn btn-lg btn-primary" />  
      </div>
    </form>
    <p>{{message}}</p>
  </div>
</template>
<script>
export default {
  name:'editor',
  data() {
    return {
      editor: {
        title: '',
        text: '',
        tags:'',
      },
      message:''
    }
  },
  mounted() {
    let self = this;
    this.editor = new Quill(this.$refs.editor, {
        modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline','image']
            ]
          }
        },
        theme: 'snow',
        placeholder: 'Start writing...',
        formats: ['bold', 'underline', 'header', 'italic'],
        
    });
    this.editor.root.innerHTML = '';
    // We will add the update event here
    this.editor.on('text-change', () => {
      this.editor.getText() ? self.editor.text = this.editor.getText() : null;
    });
  },
  methods: {
    home() {
      this.$router.push('/');
      this.$store.commit('SET_VIEW', 'home');
    },
    submit() {
      let self = this;
      let options = {
        method: 'POST',
        url: `http://api.hacktivoverflow.theodarmawan.com/questions`,
        data: {
          title: self.editor.title,
          description: self.editor.text,
          tags: self.editor.tags.toLowerCase().trim()
        },
        headers: {
          authorization: localStorage.getItem('token')
        }
      }
      this.$store.dispatch('SUBMIT_QUESTION', options)
      .then(() => {
        self.editor = {
          title: '',
          text: '',
          tags:''
        }
        self.home();
      })
      .catch(err => {
        self.message = 'Failed to submit question.';
      })
    }
  }
}
</script>
<style scoped>
  #editor {
    height: 300px;
    background-color: white;
  }
  label {
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
