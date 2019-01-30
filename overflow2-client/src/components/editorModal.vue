<template>
  <div class="modal" id="editorModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit Question </h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="form-horizontal" @submit.prevent="submitForm">
            <div class="form-group">
              <label class="control-label col-sm-2" for="title">Title:</label>
              <div class="col-sm-10">
                <input type="title" id="title" :value=q.title>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="pwd">Description:</label>
              <textarea id="description" rows="4" cols="50">
                {{q.description}}
              </textarea>
            </div>
            <div class="form-group"> 
              <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <span> {{message}} </span>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  props: ['q'],
  data() {
    return {
      message :''
    }
  },
  methods: {
    submitForm() {
      this.q.title = $('#title').val(),
      this.q.description = $('#description').text()
      this.$store.dispatch('UPDATE_ONE_Q', this.q);
      this.message = 'successfully updated question!';     
    }
  }
}
</script>
