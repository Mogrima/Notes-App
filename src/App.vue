<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div id="container" class="container">

          <message v-if="message" :message="message" />
          
          <newNote :note="note"
          @addNote="addNote" />

          <div class="notes__header">
            <h1>{{ title }}</h1>
            <!-- Проверка передачи данных в data -->
            <!-- {{ search }} -->
            <search :value="search"
                    placeholder="Find your note"
                    @search="search = $event" />

            <div class="icons">
              <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>
          <!-- {{ editNoteTitle }} -->
          <!-- {{ index }} -->
          <notes :notes="notesFilter" :grid="grid" @remove="removeNote" @addNote="addNote" @editNote="editNote" @cancelEdit="cancelEdit" />
        </div>
      </section>
    </div>
    <div class="shadow shadow--none" @click="cancelEditShadow"></div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'

export default {
  components: {
    message,
    newNote,
    notes,
    search,
  },
  data() {
    return {
      title: "Note App",
      message: null,
      grid: true,
      // editMode: false,
      priority: '',
      search: '',
      editNoteTitle: '',
      notes: [
        {
          title: "First Note",
          descr: "Description for first none",
          date: new Date(Date.now()).toLocaleString(),
          priority: 'normal',
        },
        {
          title: "Second Note",
          descr: "Description for second none",
          date: new Date(Date.now()).toLocaleString(),
          priority: 'normal',
        },
        {
          title: "Third Note",
          descr: "Description for third none",
          date: new Date(Date.now()).toLocaleString(),
          priority: 'normal',
        },
      ],
      note: {
        title: "",
        descr: "",
        priority: "normal",
        editMode: false,
      },
    };
  },
  computed: {
    notesFilter() {
      let array = this.notes,
          search = this.search
      
      if (!search) return array
      search = search.trim().toLowerCase()

      array = array.filter(function (item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })

      // Error
      return array 
    }
  },
  methods: {
    addNote() {
      let {title, descr, priority} = this.note

      if(title === '') {
        this.message = 'title can`t be blank!'
        return false
      }

      this.notes.push({
        title,
        descr,
        priority,
        date: new Date(Date.now()).toLocaleString()
      })
      this.message = null
      this.note.title = ''
      this.note.descr =''
      this.note.priority ='normal'
    },
    removeNote(index) {
      this.notes.splice(index, 1)
      // console.log("remive note")
    },
    editNote(index) {
      let array = this.notes
      // let editNote = array[index]
      // // this.notes[index].title = editNote.title
      // console.log(array[index].title)
      // console.log(editNote.title)
      let editNoteTitle = array[index].editNoteTitle
      array[index].title = array[index].editNoteTitle
      // this.grid = false
      console.log(index)
      console.log(editNoteTitle)

      let title = document.getElementsByClassName("title")[index],
      titleInput = document.getElementsByClassName("notes__input-title")[index]
      title.classList.remove("editModeOff")
      titleInput.classList.remove("editModeON")
    },
    cancelEdit(index) {
      let array = this.notes
      array[index].editNoteTitle = ''
      console.log("cancel")

      let title = document.getElementsByClassName("title")[index],
      titleInput = document.getElementsByClassName("notes__input-title")[index],
      shadow = document.getElementsByClassName("shadow")[0]
      title.classList.remove("editModeOff")
      titleInput.classList.remove("editModeON")
      shadow.classList.add("shadow--none")
    },
    cancelEditShadow() {
     let array = this.notes
      array[index].editNoteTitle = ''

      let title = document.getElementsByClassName("title")[index],
      titleInput = document.getElementsByClassName("notes__input-title")[index],
      shadow = document.getElementsByClassName("shadow")[0]
      title.classList.remove("editModeOff")
      titleInput.classList.remove("editModeON")
      shadow.classList.add("shadow--none")
    }
  }
};
</script>
