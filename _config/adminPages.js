export default {
  forms: {
    permission: 'iforms.forms.manage',
    activated: true,
    path: '/form/form',
    name: 'qform.admin.form.index',
    crud: import('@imagina/qform/_crud/crudForms'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.sidebar.adminForm',
    icon: 'fab fa-wpforms',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  formsDesign: {
    permission: null,
    activated: true,
    path: '/form/form/:id',
    name: 'qform.admin.form.design',
    page: () => import('@imagina/qform/_pages/admin/forms/design'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.sidebar.designForm',
    icon: 'fab fa-wpforms',
    authenticated: true
  },
  fields: {
    permission: null,
    activated: true,
    path: '/form/fields/:id',
    name: 'qform.admin.fields.index',
    page: () => import('@imagina/qform/_pages/admin/fields/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.sidebar.adminField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  },
  fieldsCreate: {
    permission: null,
    activated: true,
    path: '/form/fields/create/:formId',
    name: 'qform.admin.fields.create',
    page: () => import('@imagina/qform/_pages/admin/fields/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.layout.newField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  fieldsUpdate: {
    permission: null,
    activated: true,
    path: '/form/fields/:id/update',
    name: 'qform.admin.fields.update',
    page: () => import('@imagina/qform/_pages/admin/fields/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.layout.updateField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  leads: {
    permission: null,
    activated: true,
    path: '/form/lead',
    name: 'qform.admin.leads.index',
    crud: import('@imagina/qform/_crud/crudLeads'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.sidebar.adminLead',
    icon: 'fas fa-leaf',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms'],
      export: {
        title: 'qform.sidebar.adminLead',
        icon: 'fas fa-leaf',
        moduleName: "Iforms",
        exportName: "LeadsPerFormExport",
        fileName: "Leads"
      },
      exportFields: {
        formId: {
          value: null,
          type: 'select',
          required: true,
          props: {
            label: 'Formulario*',
          },
          loadOptions: {
            apiRoute: 'apiRoutes.qform.forms',
            select: {label: 'title', id: 'id'},
          }
        }
      },
    }
  },
  leadsShow: {
    permission: null,
    activated: true,
    path: '/form/lead/:id',
    name: 'qform.admin.leads.show',
    page: () => import('@imagina/qform/_pages/admin/leads/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qform.sidebar.adminLead',
    icon: 'fas fa-chalkboard-teacher',
    authenticated: true
  },
}
