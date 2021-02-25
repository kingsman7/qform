<template>
  <q-dialog id="leadShowModal" v-model="modal.show" content-class="modal-form-crud"
            persistent transition-show="slide-up" transition-hide="slide-down"
            @hide="resetModal()">
    <q-card class="bg-grey-1 backend-page row" v-if="modal.lead">
      <!--Header-->
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <label class="ellipsis">{{ modal.lead.form.title }}</label>
        </q-toolbar-title>
        <q-btn class="q-hide q-md-show" flat v-close-popup icon="fas fa-times"/>
      </q-toolbar>

      <!--Content-->
      <q-card-section id="cardContent" class="relative-position col-12 q-pa-none">
        <!--Items-->
        <q-list separator>
          <q-item v-for="(item, itemKey) in showLeadItems" :key="itemKey">
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!--Loading-->
        <inner-loading :visible="modal.loading"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
      modal: {
        show: false,
        lead: false,
        loading: false,
        fields: []
      }
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qform.leads',
        permission: 'iforms.leads',
        create: false,
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'formName', label: this.$tr('qform.layout.form.form'), field: 'form', align: 'left',
              format: val => val ? val.title : ''
            },
            {
              name: 'values', label: this.$trp('ui.label.data'), field: 'values', align: 'left',
              classes: 'ellipsis', style: 'max-width : 350px',
              format: val => val ? Object.values(val).join(', ') : ''
            },
            {
              name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'updatedAt', label: this.$tr('ui.form.updatedAt'), field: 'updatedAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
          ],
          requestParams: {
            include: 'form'
          },
          filters: {
            formId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('qform.layout.form.form'),
                clearable: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qform.forms',
                select: {label: 'title', id: 'id'},
              }
            }
          },
          actions: [
            {
              icon: 'fas fa-eye',
              color: 'info',
              tooltip : this.$tr('ui.label.view'),
              action: (item) => {
                this.modal.lead = item
                this.modal.show = true
                this.getFormFields()
              }
            }
          ]
        },
        update: false,
        delete: false
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    },
    //Fields to show
    showLeadItems() {
      let response = []

      if (this.modal.lead) {
        let fields = this.$clone(this.modal.fields)
        let leadValues = this.$clone(this.modal.lead.values)

        //Merge values
        fields.forEach(field => {
          response.push({
            label: field.label,
            value: leadValues[field.name] || '-'
          })
        })
      }

      //Response
      return response
    }
  },
  methods: {
    //Get form field
    getFormFields(refresh = false) {
      return new Promise(resolve => {
        this.modal.loading = true
        //Request Params
        let requestParams = {
          refresh: true,
          params: {
            filter: {
              formId: this.modal.lead.formId,
              order: {field: 'order', way: 'asc'}
            }
          }
        }
        //Request
        this.$crud.index('apiRoutes.qform.fields', requestParams).then(response => {
          this.modal.fields = response.data
          this.modal.loading = false
        }).catch(error => this.modal.loading = false)
      })
    },
    //Reset Modal
    resetModal() {
      this.modal = {
        show: false,
        lead: false,
        loading: false,
        fields: []
      }
    }
  }
}
</script>

<style lang="stylus">
#leadShowModal
  #cardContent
    min-height 150px
    max-height calc(100vh - 150px) !important
    overflow-y scroll
</style>
