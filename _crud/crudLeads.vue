<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qform.forms',
          permission: 'iform.leads',
          create: false,
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'title', label: this.$tr('qform.layout.form.form'), field: 'title', align: 'left'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {
              formId: {
                label: this.$tr('qform.layout.form.form'),
                value: '',
                type: 'select',
                isRequired: true,
                options: [
                  {label: this.$tr('ui.label.all'), id: ''}
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.qform.forms',
                  select: {label: 'title', id: 'id'},
                }
              },
            },
            actions : [
              {
                icon : 'fab fa-wpforms',
                color : 'teal',
                route : 'qform.admin.leads.show',
                action : () => {
                  //this.$alert.info({message : 'Tes!'})
                }
              }
            ]
          },
          update: false,
          delete: false,
          formLeft: {
            id: {value: ''},
          },
          formRight: {
          },
        }
      }
    }
  }
</script>
