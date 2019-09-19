<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qform.fields',
          permission: 'iform.fields',
          create: {
            title: this.$tr('qform.layout.newField'),
            to : 'qform.admin.fields.create'
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'typeName', label: this.$tr('ui.form.type'), field: 'typeName'},
              {name: 'label', label: this.$tr('qform.layout.form.label'), field: 'label'},
              {name: 'parent', label: this.$tr('ui.form.parent'), field: 'parent',
                format: val => (val && val.label) ? val.label : '-'},
              {name: 'form', label: this.$tr('qform.layout.form.form'), field: 'form',
                format: val => (val && val.title) ? val.title : '-'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {include: 'form,parent'},
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
              parentId:{
                label: this.$tr('ui.form.parent'),
                value: '',
                type: 'select',
                clearable: true,
                options: [
                  {label: this.$tr('ui.label.all'), id: ''}
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.qform.fields',
                  select: {label: 'label', id: 'id'},
                }
              },
            }
          },
          update: {
            title: this.$tr('qform.layout.updateField'),
            to : 'qform.admin.fields.update'
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            type:{
              label: this.$tr('ui.form.type'),
              value: 0,
              type: 'select',
              clearable: true,
              options: [
                {label: 'Text', id: 0},
                {label: 'Number', id: 1},
                {label: 'Email', id: 2},
                {label: 'Text Area', id: 3},
              ]
            },
            name:{
              label: this.$tr('ui.form.name'),
              value: '',
              type: 'text',
              isRequired: true,
              isTranslatable: false,
            },
            label:{
              label: this.$tr('qform.layout.form.label'),
              value: '',
              type: 'text',
              isRequired: true,
              isTranslatable: true,
            },
            placeholder:{
              label: this.$tr('qform.layout.form.placeholder'),
              value: '',
              type: 'text',
              isRequired: true,
              isTranslatable: true,
            },
            description:{
              label: this.$tr('ui.form.description'),
              value: '',
              type: 'text',
              isRequired: true,
              isTranslatable: true,
            },
          },
          formRight: {
            required:{
              label: this.$tr('ui.form.required'),
              value: false,
              type: 'checkbox',
            },
            parentId:{
              label: this.$tr('ui.form.parent'),
              value: null,
              type: 'select',
              clearable: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qform.fields',
                select: {label: 'label', id: 'id'},
              }
            },
            formId:{
              label: this.$tr('qform.layout.form.form'),
              value: null,
              type: 'select',
              clearable: true,
              isRequired: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qform.forms',
                select: {label: 'title', id: 'id'},
              }
            },
          },
        }
      }
    }
  }
</script>
