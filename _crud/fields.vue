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
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.field"),
        apiRoute: 'apiRoutes.qform.fields',
        permission: 'iforms.fields',
        create: {
          title: this.$tr('qform.layout.newField'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'typeName', label: this.$tr('ui.form.type'), field: 'typeName'},
            {name: 'label', label: this.$tr('qform.layout.form.label'), field: 'label'},
            {name: 'order', label: this.$tr('qform.layout.form.order'), field: 'order'},
            {
              name: '_form.vue', label: this.$tr('qform.layout.form.form'), field: '_form.vue',
              format: val => (val && val.title) ? val.title : '-'
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
          ],
          requestParams: {
            filter: {
              formId: this.$route.params
            },
            include: '_form.vue'
          },
        },
        update: {
          title: this.$tr('qform.layout.updateField'),
          // to: 'qform.admin.fields.update'
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          formId: {value: this.$route.params.id},
          blockId: {value: this.$route.params.blockId},
          name: {
            value: '',
            type: 'input',
            isTranslatable: false,
            props: {
              label: this.$tr('ui.form.name'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ]
            }
          },
          label: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('qform.layout.form.label'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ]
            }
          },
          type: {
            value: 0,
            type: 'select',
            props: {
              label: this.$tr('ui.form.parent'),
              options: [
                {label: this.$tr('ui.label.disabled'), value: 0},
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.types',
              select: {label: 'name', id: 'id'},
              requestParams: {include: 'parent'}
            }
          },
          placeholder: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('qform.layout.form.placeholder'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ]
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('ui.form.description'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ]
            }
          },
          width: {
            value: '',
            type: 'select',
            props: {
              label: this.$tr('ui.form.width'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              options: [
                {value: 12, label: this.$tr('qform.layout.form.columns.full')},
                {value: 9, label: this.$tr('qform.layout.form.columns.nine')},
                {value: 8, label: this.$tr('qform.layout.form.columns.eight')},
                {value: 6, label: this.$tr('qform.layout.form.columns.six')},
                {value: 4, label: this.$tr('qform.layout.form.columns.four')},
                {value: 3, label: this.$tr('qform.layout.form.columns.three')},
              ],
            },
          },
        },
        formRight: {
          prefixType: {
            name: 'type',
            value: '',
            type: 'select',
            fakeFieldName: 'prefix',
            props: {
              label: this.$tr('ui.form.type'),
              options: [
                {value: 'icon', label: this.$tr('ui.form.icon')},
                {value: 'text', label: this.$tr('ui.label.text')}
              ],
            }
          },
          prefixText: {
            name: 'text',
            value: '',
            type: 'input',
            fakeFieldName: 'prefix',
            props: {
              label: this.$tr('ui.form.prefix'),
            }
          },

          suffixType: {
            name: 'type',
            value: '',
            type: 'select',
            fakeFieldName: 'suffix',
            props: {
              label: this.$tr('ui.form.type'),
              options: [
                {value: 'icon', label: this.$tr('ui.form.icon')},
                {value: 'text', label: this.$tr('ui.label.text')}
              ],
            }
          },
          suffixText: {
            name: 'text',
            value: '',
            type: 'input',
            fakeFieldName: 'suffix',
            props: {
              label: this.$tr('ui.form.suffix'),
            }
          },

          required: {
            value: false,
            type: 'checkbox',
            props: {
              label: this.$tr('ui.form.required'),
            }
          },
        }
      }
    },

    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
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
}
</script>
