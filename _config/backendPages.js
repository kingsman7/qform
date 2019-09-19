//Layout container
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  forms: {
		permission: null,
		activated: true,
		path: '/iform/form',
		name: 'qform.admin.form.index',
		layout: require('@imagina/qform/_layouts/admin/forms/index').default,
		containerLayout: master,
		title: 'qform.sidebar.adminForm',
		icon: 'fab fa-wpforms',
		middleware: [auth,access]
	},
  fields: {
    permission: null,
    activated: true,
    path: '/iform/fields',
    name: 'qform.admin.fields.index',
    layout: require('@imagina/qform/_layouts/admin/fields/index').default,
    containerLayout: master,
    title: 'qform.sidebar.adminField',
    icon: 'fas fa-grip-horizontal',
    middleware: [auth,access]
  },
  fieldsCreate: {
    permission: null,
    activated: true,
    path: '/iform/fields/create',
    name: 'qform.admin.fields.create',
    layout: require('@imagina/qform/_layouts/admin/fields/form').default,
    containerLayout: master,
    title: 'qform.layout.newField',
    icon: 'fas fa-grip-horizontal',
    middleware: [auth,access]
  },
  fieldsUpdate: {
    permission: null,
    activated: true,
    path: '/iform/fields/:id',
    name: 'qform.admin.fields.update',
    layout: require('@imagina/qform/_layouts/admin/fields/form').default,
    containerLayout: master,
    title: 'qform.layout.updateField',
    icon: 'fas fa-grip-horizontal',
    middleware: [auth,access]
  },
  leads: {
    permission: null,
		activated: true,
		path: '/iform/lead',
		name: 'qform.admin.leads.index',
		layout: require('@imagina/qform/_layouts/admin/leads/index').default,
		containerLayout: master,
		title: 'qform.sidebar.adminLead',
		icon: 'fas fa-chalkboard-teacher',
		middleware: [auth,access]
	}
}
