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
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
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
          title: this.$tr('iforms.cms.newBlock'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title'},
            {
              name: 'description', label: this.$tr('isite.cms.label.description'), field: 'description',
              style: 'width: 150px'
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
        },
        update: {
          title: this.$tr('iforms.cms.updateBlock'),
        },
        delete: {
          title: this.$tr('iforms.cms.deleteBlock'),
        },

        formLeft: {
          id: {value: ''},
          formId: {value: this.$route.params.id},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.title'),
            }
          },
          name: {
            value: '',
            type: 'input',
            props: {
              label: this.$tr('isite.cms.form.name'),
              rules: [
                val => (val ? this.$helper.validateAlphaNumeric(val) : true) || this.$tr('isite.cms.message.mustContainAlphanumeric')
              ]
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.label.description'),
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
