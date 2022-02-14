<template>
  <master-modal v-model="modal.show" @hide="resetModal()" :title="modal.lead ? modal.lead.form.title : ''">
    <div class="box">
      <q-list separator dense>
        <q-item v-for="(item, itemKey) in showLeadItems" :key="itemKey" style="padding: 8px 0">
          <q-item-section>
            <q-item-label v-if="item.fieldType != 'media'">{{ item.label }}</q-item-label>
            <!--File preview-->
            <q-item-label v-if="item.fieldType == 'media'">
              <file-list v-model="item.value" grid-col-class="col-12" hide-header/>
            </q-item-label>
            <!--value-->
            <q-item-label v-else caption>{{ item.value }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </master-modal>
</template>

<script>
//Components
import fileList from '@imagina/qsite/_components/master/fileList'

export default {
  components: {fileList},
  data() {
    return {
      crudId: this.$uid(),
      modal: {
        show: false,
        lead: false
      }
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.lead"),
        apiRoute: 'apiRoutes.qform.leads',
        permission: 'iforms.leads',
        extraFormFields: 'iforms.crud-fields.leads',
        create: false,
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'formName', label: this.$tr('iforms.cms.form.form'), field: 'form', align: 'left',
              format: val => val ? val.title : ''
            },
            {
              name: 'assignedTo', label: this.$tr('isite.cms.form.assignedTo'), field: 'assignedTo', align: 'left',
              format: val => val ? val.fullName : '-'
            },
            {
              name: 'values', label: this.$trp('isite.cms.label.data'), field: 'values', align: 'left',
              classes: 'ellipsis', style: 'max-width : 350px',
              format: val => val ? Object.values(val).join(', ') : ''
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'updatedAt', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
          requestParams: {
            include: 'form,assignedTo,files',
            filter: {
              order: {
                field: 'created_at',
                way: 'desc',
              }
            }
          },
          filters: {
            formId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('iforms.cms.form.form'),
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
              name: 'viewLead',
              icon: 'fas fa-eye',
              color: 'info',
              tooltip: this.$tr('isite.cms.label.view'),
              action: (item) => {
                this.modal.lead = item
                this.modal.show = true
              }
            }
          ]
        },
        update: true,
        delete: false,
        formLeft: {
          id: {value: ''},
          assignedToId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/quser/_crud/users'),
              crudProps: {
                label: `${this.$trp('isite.cms.form.assignedTo')}`,
              },
              config: {
                options: {
                  label: 'fullName', value: 'id'
                }
              },
            },
          }
        }
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
        let leadValues = this.$clone(this.modal.lead.values || [])
        let files = this.$clone(this.modal.lead.files)

        //Merge values
        this.$clone(this.modal.lead.form.fields).forEach(field => {
          //get field type
          let fieldType = field.dynamicField ? (field.dynamicField.type || 'input') : 'input'
          //get field value
          let fieldValue = leadValues[field.name] || '-'
          //Get field file
          let fieldFile = (fieldType != 'media') ? null : files.find(item => item.zone == fieldValue.split('/').pop())

          //Add extra data to field
          response.push({
            ...field,
            label: field.label,
            value: (fieldType != 'media') ? fieldValue : [{
              id: this.$uid(),
              ...fieldFile,
              path: fieldValue,
              mediumThumb: fieldValue,
              filename: field.label,
            }],
            fieldType: fieldType
          })
        })
      }

      //Response
      return response
    }
  },
  methods: {
    //Reset Modal
    resetModal() {
      this.modal = {show: false, lead: false}
    }
  }
}
</script>

<style lang="stylus">
</style>
