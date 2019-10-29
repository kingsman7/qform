<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qform.fields',
          permission: 'iforms.fields',
          create: {
            title: this.$tr('qform.layout.newField'),
            to : {name:'qform.admin.fields.create'}
          },
          read: {
            search: false,
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'typeName', label: this.$tr('ui.form.type'), field: 'typeName'},
              {name: 'label', label: this.$tr('qform.layout.form.label'), field: 'label'},
              {name: 'order', label: this.$tr('qform.layout.form.order'), field: 'order'},
              {name: '_form.vue', label: this.$tr('qform.layout.form.form'), field: '_form.vue',
                format: val => (val && val.title) ? val.title : '-'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {
              filter:{
                formId:this.$route.params.id
              },
              include: '_form.vue'
            },
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
