<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.form"),
        apiRoute: 'apiRoutes.qform.forms',
        permission: 'iforms.forms',
        extraFormFields: 'iforms.crud-fields.forms',
        create: {
          title: this.$tr('qform.layout.newForm'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px', align: 'left'},
            {name: 'title', label: this.$tr('ui.form.title'), field: 'title', align: 'left'},
            {name: 'slug', label: this.$tr('ui.form.slug'), field: 'systemName', align: 'left'},
            {name: 'active', label: this.$tr('ui.form.status'), field: 'active', align: 'left'},
            {
              name: 'user', label: this.$tr('ui.label.user'), field: 'user', align: 'left',
              format: val => (val && val.fullName) ? val.fullName : '-'
            },
            {
              name: 'destinationEmail', label: this.$trp('ui.label.email'), field: 'destinationEmail', align: 'left',
              classes: 'ellipsis', style: 'max-width : 250px', format: val => val ? val.join(', ') : '-'
            },

            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
          ],
          requestParams: {include: 'fields,leads,user'},
          filters: {
            userId: {
              value: '0',
              type: 'select',
              props: {
                label: this.$tr('ui.label.user'),
                options: [
                  {label: this.$tr('ui.label.all'), value: '0'}
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
              }
            }
          },
          actions: [
            {
              icon: 'fas fa-list-ol',
              color: 'info',
              route: 'qform.admin.fields.index',
              label: this.$trp('ui.label.field')
            }
          ]
        },
        update: {
          title: this.$tr('qform.layout.updateForm')
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.title')}*`,
              rules: [val => !!val || this.$tr('ui.message.fieldRequired')],
            }
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: this.$tr('ui.form.status'),
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'}
              ]
            },
          },
          destinationEmail: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('ui.label.email')}`,
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique",
              outlined: true,
              dense: true,
            }
          },
          userId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.label.user'),
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'},
            }
          },
          urlTermsAndConditions: {
            value: null,
            type: 'input',
            isFakeField: true,
            props: {
              label: `${this.$tr('qform.layout.form.urlTermsAndConditions')}`,
            }
          },
        },
        formRight: {
          successText: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('qform.layout.form.successText')}`,
              type: 'textarea',
              rows: "3",
            },
          },
          submitText: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('qform.layout.form.submitText')}`,
              type: 'textarea',
              rows: "3",
            },
          }
        },
        getDataForm: (data, typeForm) => {
          return new Promise((resolve, reject) => {
            if (typeForm == 'create') {
              let defaultLocale = this.$store.state.qsiteApp.defaultLocale
              let formTitle = data[defaultLocale].title
              data.systemName = this.$helper.getSlug(formTitle)
            }
            resolve(data)
          })
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
