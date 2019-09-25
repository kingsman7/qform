<template>
  <div
    id="pageId"
    class="q-layout-page layout-padding">
    <div class="relative-position q-mb-lg backend-page">
      <div class="box q-mb-sm" v-if="false">
        <render-form :formId="$route.params.id"/>
      </div>
      <div class="box">
        <div class="row gutter-y-sm">
          <div class="col-md-12 relative-position">
            <div class="float-right">
              <q-btn
                icon="fas fa-arrow-alt-circle-left"
                :to="{name: 'qform.admin.form.index'}"
                label="Back to forms"
                color="primary"
                class="q-ml-xs"/>
              <q-btn
                v-if="false"
                @click="updateOrder()"
                icon="reorder"
                label="Update Order"
                color="primary"
                class="q-ml-xs"/>
              <q-btn
                icon="fas fa-edit"
                :to="{name: 'qform.admin.fields.create', params: {formId: $route.params.id} }"
                label="new Redcord"
                color="green"
                class="q-ml-xs"/>
              <q-btn
                @click.native="getFields(true)"
                icon="fas fa-sync-alt"
                color="info"
                class="q-ml-xs">
                <q-tooltip :delay="300">
                  {{$tr('ui.label.refresh')}}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="col-md-12">
            <draggable
              @update="updateOrder"
              v-bind="dragOptions"
              v-model="fields">
              <transition-group class="list-group">
                <div
                  class="list-group-item"
                  v-for="(field, index) in fields"
                  :key="field.id">
                  <small>({{index+1}})</small> {{field.label}}
                  <div style="display:inline; position: absolute; right: 30px">
                    <q-btn
                      icon="fas fa-pen"
                      @click="goTo(field)"
                      size="xs"
                      class="q-mr-sm"
                      color="positive"/>
                    <q-btn
                      @click="dialogDeleteItem = true; itemIdToDelete = field"
                      icon="fas fa-trash-alt"
                      size="xs"
                      class="q-mr-sm"
                      color="negative"/>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  
    <q-dialog
      v-model="dialogDeleteItem"
      class="backend-page"
      prevent-close>
      <!-- Message -->
      <div slot="message">
        <h1 class="q-title text-negative">{{itemIdToDelete.label}}</h1>
        {{$tr('ui.message.deleteRecord')}}
      </div>
      <!--Buttons-->
      <div slot="buttons" >
        <!--Button cancel-->
        <q-btn
          color="blue-grey"
          label="Cancel"
          @click="dialogDeleteItem = false"/>
        <!--Button confirm delete category-->
        <q-btn
          color="negative"
          icon="fas fa-trash-alt"
          :loading="loading"
          label="Delete"
          @click="deleteItem()"/>
      </div>
    </q-dialog>
    <inner-loading :visible="loading"/>
  </div>
</template>
<script>
  import renderForm from '@imagina/qform/_components/frontend/forms/renderForm'
  import draggable from 'vuedraggable'
  import {helper} from "@imagina/qhelper/_plugins/helper";
  
  export default {
    props: {},
    components:{
      draggable,
      renderForm
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
    },
    watch: {
      fields: function () {
        this.fields.forEach( (element, index) => {
          element.order = index
        })
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getFields(true)
      })
    },
    data() {
      return {
        loading: false,
        fields: [],
        dialogDeleteItem: false,
        itemIdToDelete: {},
      }
    },
    methods: {
      getFields(refresh = false){
        this.loading = true
        let params = {
          refresh: refresh,
          params :{
            filter: {
              formId: this.$route.params.id,
              order:{
                field:'order',
                way: 'asc'
              }
            }
          }
        }
        this.$crud.index('apiRoutes.qform.fields', params)
        .then( response => {
          this.fields =  response.data.map(item => {
            return helper.toSnakeCase(item)
          })
          this.loading = false
        })
        .catch( error => {
          this.loading = false
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      },
      handleEvents(event){
        this.updateOrderInField(event.moved.element, event.moved.newIndex)
      },
      goTo(field){
        this.$router.push({
          name: 'qform.admin.fields.update',
          params: {
            id: field.id
          }
        })
      },
      deleteItem(){
        this.loading = true
        this.$crud.delete('apiRoutes.qform.fields', this.itemIdToDelete.id)
          .then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordDeleted')})
            this.dialogDeleteItem = false
            this.getFields(true)
            this.loading = false
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom'})
            this.loading = false
          })
      },
      updateOrder () {
        let data = {
          id: this.$route.params.id,
          fields: this.fields
        }
        this.loading = true
        this.$crud.create('apiRoutes.qform.updateOrders', data)
        .then( response => {
          this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
          this.loading = false
        })
        .catch( error => {
          this.loading = false
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      }
    }
  }
</script>
