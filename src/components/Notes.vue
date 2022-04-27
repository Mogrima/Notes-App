<template>
<div class="notes">
  <div
    class="notes__item"
    :class="[{ full: !grid}, [note.priority]]"
    v-for="(note, index) in notes"
    :key="index"
  >
    <div class="notes__header" :class="{ full: !grid}">
      <p style="cursor: pointer;" @click="removeNote(index)">X</p>
      <p class="title"  @click="editMode(index)" style="cursor: pointer;">{{ note.title }}</p>
      <input class="notes__input-title editModeOff" v-model="note.editNoteTitle" v-on:keyup.enter="editNote(index, note.editNoteTitle)" v-on:keyup.escape="cancelEdit(index)" type="text">
    </div>
    <div class="notes__body">
    <!-- <div class="notes__body" :class="[note.priority]"> -->
      <p>{{ note.descr }}</p>
      <div class="notes__meta">
        <p>{{ note.priority }}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    },
    // editMode: {
    //   type: Boolean,
    //   required: true
    // }
    // value: {
    //   type: String,
    //   required: true
    // },
  },
  // data () {
  //   return { editNoteTitle: this.value }
  // },
  methods: {
    removeNote(index) {
      // console.log(`remove id - ${index} note`)
      this.$emit('remove', index)
    },
    editMode(index) {
      console.log("dsdsdfgggg" + index)
      let title = document.getElementsByClassName("title")[index],
      titleInput = document.getElementsByClassName("notes__input-title")[index],
      shadow = document.getElementsByClassName("shadow")[0]

      title.classList.add("editModeOff")
      titleInput.classList.add("editModeON")
      shadow.classList.remove("shadow--none")
      console.log(shadow)
      // this.$emit('editMode', this.note)
    },
    editNote(index) {
      // console.log(val + " - " + index)
      this.$emit('editNote', index, this.note)
    },
    cancelEdit(index) {
      this.$emit('cancelEdit', index)
    }
  }
}
</script>

<style lang="scss">

.notes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 36px 0;
  padding: 40px 0;
}

.notes__item {
  position: relative;
  z-index: 150;
  width: 46%;
  margin-bottom: 20px;
  padding: 18px 20px;
  background-color: #fff;
  transition: all .25s cubic-bezier(.02,.01,.47,1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, .02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, .04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }

  & + .warning {
    background-color: rgb(223, 207, 66);
  }

  & + .strong {
    background-color: #dba9a8;
  }

  &.full {
    width: 100%;
    text-align: center;
  }
}

.notes__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
  font-size: 22px;
  }

  p, input {
    padding: 0;
    font-size: 22px;
    color: rgb(28, 27, 109);
    border: none;
  }

  &.full {
    justify-content: center;

    p, input {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  svg {
    margin-right: 12px;
    color: #999;
    cursor: pointer;

    &.active {
      color: #cb9998;
    }
    &:last-child {
      margin-right: 0;
    }
  }

}

.notes__body {
  p {
    margin: 20px 0;
    color: #1c1b6d;
  }
}

.notes__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #999;

  p {
    margin: 0;
  }
}

.shadow {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 100%;

  &--none {
    display: none;
  }
}

.editModeOff {
  display: none;
}

.editModeON {
  display: block;
}
  
</style>