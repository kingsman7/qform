<template></template>
<script>
export default {
  data() {
    return {
      fields: {
        formId: this.$route.params.formId,
      },
      crudId: this.$uid()
    }
  },
  methods: {
    getForms() {
      this.loading = true
      let params = {params: {}}
      this.$crud.index('apiRoutes.qform.forms', params)
        .then(response => {
          this.forms = response.data.map(item => {
            return {
              id: item.id,
              label: item.title
            }
          })
          this.loading = false
        })
        .catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
    },
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.blocks"),
        apiRoute: 'apiRoutes.qform.blocks',
        permission: 'iforms.blocks',
        extraFormFields: 'iforms.crud-fields.blocks',
        create: {
          title: this.$tr('qform.layout.newBlock'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('ui.form.title'), field: 'title'},
            {
              name: 'description', label: this.$tr('ui.label.description'), field: 'description',
              style: 'width: 150px'
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
          ],
        },
        update: {
          title: this.$tr('qform.layout.updateBlock'),
        },
        delete: {
          title: this.$tr('qform.layout.deleteBlock'),
        },

        formLeft: {
          id: {value: ''},
          formId: {value: this.$route.params.id},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('ui.form.title'),
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('ui.label.description'),
            }
          },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
