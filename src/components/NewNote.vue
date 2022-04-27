<template>
  <div class="new-note">
    <label for="">Title</label>
    <input v-model="note.title" type="text" />
    <div class="priority-controls">
    <input v-model="note.priority" type="radio" id="normal"
     name="priority" value="normal" checked>
    <label for="normal">Normal</label>

    <input v-model="note.priority" type="radio" id="warning"
     name="priority" value="warning">
    <label for="warning">Warning</label>

    <input v-model="note.priority" type="radio" id="strong"
     name="priority" value="strong">
    <label for="strong">Strong</label>
  </div>
    <label for="">Description</label>
    <textarea v-model="note.descr"></textarea>
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
  },
  methods: {
    addNote() {
      this.$emit('addNote', this.note)
    }
  }
}
</script>

<style lang="scss">
  .new-note {
    text-align: center;
  }

  .priority-controls {
    display: flex;
  }
</style>