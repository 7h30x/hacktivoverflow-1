<template>
   <!--editor-->
   <form @submit.prevent="submit" id="editorForm" class="flex-container d-flex flex-column justify-content-left">
      <label>
        Write An Answer
        <hr>
        <div id="editor" ref="editor" ></div>
      </label>
      <div>
        <input type="submit" class="btn btn-lg btn-danger" name="Post Answer"/> 
        <p id="message">{{message}}</p> 
      </div>
   </form>

</template>
<script>
export default {
  props:['q'],
  name:'editor',
  data() {
    return {
      editor: {
        text: '',
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
        placeholder: 'Start writing your answer here...',
        formats: ['bold', 'underline', 'header', 'italic'],
        
    });
    this.editor.root.innerHTML = '';
    // We will add the update event here
    this.editor.on('text-change', () => {
      this.editor.getText() ? self.editor.text = this.editor.getText() : null;
    });
  },
  methods: {
    submit() {
      let self = this;
      let options = {
        method: 'POST',
        url: `http://api.hacktivoverflow.theodarmawan.com/answers/${self.q._id}`,
        data: {
          description: self.editor.text
        },
        headers: {
          authorization: localStorage.getItem('token')
        }
      }
      this.$store.dispatch('SUBMIT_ANSWER', options)
      .then(() => {
        self.message = ' Submitted answer.';
        setTimeout(() => {
          self.message = '';
        }, 3500)
      })
      .catch(err => {
        self.message = 'Failed to submit answer';
        setTimeout(() => {
          self.message = '';
        }, 3000)
      })
    }
  }
}
</script>
<style scoped>
  #editor {
    height: 270px;
    background-color: white;
  }
  label {
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
