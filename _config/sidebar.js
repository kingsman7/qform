const pages = config('pages') // Get Pages from config

//Forms
export default [
  {
    title: 'qform.sidebar.adminGroup',
    icon: 'fas fa-wallet',
    children: [
      pages.qform.forms,
      pages.qform.fields,
      pages.qform.leads,
    ]
  },
]
