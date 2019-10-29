<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qform.forms',
          permission: 'iforms.forms',
          create: {
            title: this.$tr('qform.layout.newForm'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'title', label: this.$tr('ui.form.title'), field: 'title'},
              {name: 'slug', label: this.$tr('ui.form.slug'), field: 'systemName'},
              {
                name: 'user', label: this.$tr('ui.label.user'), field: 'user',
                format: val => (val && val.fullName) ? val.fullName : '-'
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {include: 'fields,leads,user'},
            filters: {
              userId: {
                label: this.$tr('ui.label.user'),
                value: '0',
                type: 'select',
                options: [
                  {label: this.$tr('ui.label.all'), value: '0'}
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.quser.users',
                  select: {label: 'fullName', id: 'id'},
                }
              }
            },
            actions: [
              {
                icon: 'view_compact',
                color: 'info',
                route: 'qform.admin.fields.index'
              }
            ]
          },
          update: false,
          delete: true,
          formLeft: {
            id: {value: ''},
            title: {
              label: `${this.$tr('ui.form.title')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [val => !!val || this.$tr('ui.message.fieldRequired')],
            },
            userId: {
              label: this.$tr('ui.label.user'),
              value: null,
              type: 'select',
              clearable: true,
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
              }
            }
          }
        }
      }
    }
  }
</script>
