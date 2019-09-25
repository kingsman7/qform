<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qform.leads',
          permission: 'iform.leads',
          create: false,
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'form', label: this.$tr('qform.layout.form.form'), field: 'form',
                format: val => (val && val.title) ? val.title : '-'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {include: 'form'},
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
                icon : 'fas fa-home',
                color : 'teal',
                route : 'qform.admin.leads.show', //method add data from record as params of route
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
