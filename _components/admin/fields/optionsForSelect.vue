<template>
  <q-list
    class="q-mt-md">
    <q-list-header>
      Options
      <q-btn
        @click="add()"
        icon="add"
        dense
        flat
        color="primary"/>
    </q-list-header>
    <q-item
      v-for="(item, index) in model.selectable"
      :key="index">
      <q-item-main>
        <q-field>
          <q-input
            v-model="item.name"
            placeholder="Name Option"/>
        </q-field>
      </q-item-main>
      <q-item-side right >
        <q-btn
          @click="remove(item)"
          icon="close"
          dense flat
          color="primary"/>
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    props:{
      model:{
        type: Object,
        default: () => {
          return {
            selectable:[]
          }
        }
      }
    },
    data () {
      return { }
    },
    methods: {
      add (){
        let item = {
          name: ''
        }
        this.model.selectable.push(item)
      },
      remove (element) {
        let index = this.model.selectable.findIndex( item => item === element )
        this.model.selectable.splice( index, 1 )
      }
    }
  }
</script>
