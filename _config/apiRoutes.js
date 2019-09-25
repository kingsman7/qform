const moduleName = 'iform';
const moduleVersion = 'v4';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `${baseApiUrl}/${moduleName}/${moduleVersion}`

export default {
	urlBase : urlBase,
	version: moduleVersion,
  forms : `${urlBase}/forms`,
  fields : `${urlBase}/fields`,
  leads : `${urlBase}/leads`,
  types : `${urlBase}/types`,
  updateOrders : `${urlBase}/fields/updateOrders`,
}
