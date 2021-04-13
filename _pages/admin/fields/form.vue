<template>
  <div
    id="pageId"
    class="q-layout-page layout-padding">
    <div class="relative-position q-mb-lg backend-page">
      <div class="box">
        <div class="row" v-if="success">
          <!--Language-->
          <div class="col-12 q-mb-md">
            <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
          </div>

          <q-form autocorrect="off" autocomplete="off" ref="formContent" class="q-col-gutter-x-md full-width row"
                  v-if="locale.success" @submit="fieldId ? update() : create()"
                  @validation-error="$alert.error($tr('ui.message.formInvalid'))">
            <!--Form left-->
            <div class="col-12 col-md-8" v-if="locale.success">
              <q-input data-testid="name" outlined dense v-model="locale.formTemplate.name" :label="`${$tr('ui.form.name')}*`"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>

              <q-input data-testid="label" outlined dense v-model="locale.formTemplate.label"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       :label="`${$tr('qform.layout.form.label')} (${locale.language})*`"/>

              <q-input data-testid="placeholder" outlined dense v-model="locale.formTemplate.placeholder"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       :label="`${$tr('qform.layout.form.placeholder')} (${locale.language})*`"/>

              <q-input data-testid="description" outlined dense v-model="locale.formTemplate.description"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       :label="`${$tr('ui.form.description')} (${locale.language})*`"/>
              <div class="row q-col-gutter-sm">
                  <div class="col-12">
                    <span class="text-caption">{{ `${$tr('ui.form.prefix')}` }}</span>
                  </div>
                  <div class="col-4">
                    <q-select data-testid="prefixType" v-model="locale.formTemplate.prefix.type" :options="prefixTypes"
                              outlined dense emit-value map-options :label="`${$tr('ui.form.type')}`"/>
                  </div>
                  <div class="col-8">
                    <q-input data-testid="prefixValue" outlined dense :label="`${$tr('qform.layout.form.value')}`" v-model="locale.formTemplate.prefix.value" />
                  </div>
              </div>
              <div class="row q-col-gutter-sm">
                  <div class="col-12">
                    <span class="text-caption">{{ `${$tr('qform.layout.form.suffix')}` }}</span>
                  </div>
                  <div class="col-4">
                    <q-select data-testid="prefixType" v-model="locale.formTemplate.suffix.type" :options="prefixTypes"
                              outlined dense emit-value map-options :label="`${$tr('ui.form.type')}`"/>
                  </div>
                  <div class="col-8">
                    <q-input data-testid="suffix" outlined dense :label="`${$tr('qform.layout.form.value')}`" v-model="locale.formTemplate.suffix.value" />
                  </div>
              </div>

              <q-select data-testid="type" v-model="locale.formTemplate.width" :options="columnWidths"
                        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                        outlined dense emit-value map-options :label="`${$tr('ui.form.width')}*`"/>

              <q-select data-testid="type" v-model="locale.formTemplate.type" :options="types"
                        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                        outlined dense emit-value map-options :label="`${$tr('ui.form.type')}*`"/>

              <div v-if="[5,6,8].indexOf(locale.formTemplate.type) >= 0" class="options-for-select">
                <optionsForSelect :model="locale.formTemplate"/>
              </div>

            </div>

            <!--Form right-->
            <div class="col-12 col-md-4" v-if="locale.success">
              <q-input data-testid="order" outlined dense v-model="locale.formTemplate.order" :label="`${$tr('qform.layout.form.order')}`"/>
              <q-checkbox data-testid="required" :label="$tr('ui.form.required')" v-model="locale.formTemplate.required"/>
            </div>

            <!--buttons-->
            <div class="col-12 text-right">
              <q-btn v-if="fieldId" color="positive" :loading="loading" icon="fas fa-edit"
                     :label="$tr('ui.label.update')" rounded type="submit"/>
              <q-btn v-else color="positive" :loading="loading" icon="fas fa-edit"
                     :label="$tr('ui.label.create')" rounded type="submit"/>
            </div>
          </q-form>
        </div>
      </div>
    </div>

    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import optionsForSelect from '@imagina/qform/_components/admin/fields/optionsForSelect'

  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import {scroll} from 'quasar'

  const {getScrollTarget, setScrollPosition} = scroll

  export default {
    components: {
      optionsForSelect,
    },
    watch: {
      $route(to, from) {
        this.initForm()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.initForm()
      })
    },
    validations() {
      return this.getObjectValidation()
    },
    data() {
      return {
        locale: {},
        vTab: 'data',
        loading: false,
        loadingCategory: false,
        success: false,
        fieldId: false,
        optionsTemplate: {
          categories: [],
          products: [],
          relatedProducts: []
        },
        buttonActions: {label: '', value: 1},
        modalShow: {
          category: false
        },
        types: [],
        forms: [],
        fields: [],
        prefixTypes:[
          {value: 'icon', label: this.$tr('ui.form.icon')},
          {value: 'text', label: this.$tr('ui.label.text')}
        ],
        columnWidths:[
          {value: 12, label: this.$tr('qform.layout.form.columns.full')},
          {value: 9, label: this.$tr('qform.layout.form.columns.nine')},
          {value: 8, label: this.$tr('qform.layout.form.columns.eight')},
          {value: 6, label: this.$tr('qform.layout.form.columns.six')},
          {value: 4, label: this.$tr('qform.layout.form.columns.four')},
          {value: 3, label: this.$tr('qform.layout.form.columns.three')},
        ]
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            type: null,
            name: '',
            required: false,
            formId: this.$route.params.formId,
            selectable: [],
            order: 0,
            width: '12',
            prefix: {
              type: 'icon',
              value: ''
            },
            suffix: {
              type: 'icon',
              value: ''
            },
          },
          fieldsTranslatable: {
            label: '',
            placeholder: '',
            description: '',
          }
        }
      },
      //Check if update options
      updateOptions() {
        if (this.$route.params.editOptions)
          setTimeout(() => {
            this.vTab = 'options'
            let target = getScrollTarget(this.$refs.productFormPage)
            let offset = this.$refs.productFormPage.scrollHeight
            setScrollPosition(target, offset, 1000)
          }, 500)
      },
      //Options translatables
      options() {
        return {}
      },
      //Has manage master record
      canManageRecordMaster() {
        return true
      }
    },
    methods: {
      //Init Form
      async initForm() {
        this.loading = true
        this.success = false//Disable status of page
        this.vTab = 'data'
        this.locale = this.$clone(this.dataLocale)//Add fields
        this.fieldId = this.$route.params.id//Update param from route
        if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
        await this.getData()//Get Data Item
        this.getTypes()
        this.getForms()
        this.getFields()
        this.success = true//Activate status of page
        this.updateOptions
        this.loading = false
      },
      //Get product if is edit
      getData() {
        return new Promise((resolve, reject) => {
          const fieldId = this.$clone(this.fieldId)
          if (fieldId) {
            let configName = 'apiRoutes.qform.fields'
            //Params
            let params = {
              refresh: true,
              params: {
                filter: {allTranslations: true}
              }
            }
            //Requesta
            this.$crud.show(configName, fieldId, params).then(response => {
              this.orderDataItemToLocale(response.data)
              resolve(true)//Resolve
            }).catch(error => {
              console.error(error)
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }
        })
      },
      //order data item to locale component
      orderDataItemToLocale(data) {
        let orderData = this.$clone(data)
        orderData.selectable = JSON.parse(data.selectable)
        this.locale.form = this.$clone(orderData)
      },
      //Create Product
      async create() {
        if (await this.$refs.localeComponent.validateForm()) {
          //Check validations
          this.loading = true
          let configName = 'apiRoutes.qform.fields'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            this.$router.push({name: 'qform.admin.fields.index', params: {id: this.$route.params.formId}})
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          })
        }
      },
      //Update Product
      async update() {
        if (await this.$refs.localeComponent.validateForm()) {
          //Check validations
          this.loading = true
          let configName = 'apiRoutes.qform.fields'
          this.$crud.update(configName, this.fieldId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            this.initForm()
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        }
      },
      //Get just values not null from form
      getDataForm() {
        let response = this.locale.form
        for (var item in response) {
          let valueItem = response[item]
          if (valueItem == null || valueItem == undefined)
            delete response[item]
        }
        response.selectable = JSON.stringify(response.selectable)
        response.prefix = response.prefix || {type: '', value: ''}
        response.suffix = response.suffix || {type: '', value: ''}
        return response
      },
      //Action after created
      getTypes() {
        this.loading = true
        let params = {params: {}}
        this.$crud.index('apiRoutes.qform.types', params).then(response => {
          this.types = response.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
      getForms() {
        this.loading = true
        let params = {params: {}}
        this.$crud.index('apiRoutes.qform.forms', params)
          .then(response => {
            this.forms = response.data.map(item => {
              return {
                value: item.id,
                label: item.title
              }
            })
            this.loading = false
          })
          .catch(error => {
            console.error(error)
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            this.loading = false
          })
      },
      getFields() {
        this.loading = true
        let params = {params: {}}
        this.$crud.index('apiRoutes.qform.fields', params)
          .then(response => {
            this.fields = response.data.map(item => {
              return {
                value: item.id,
                label: item.label
              }
            })
            this.loading = false
          })
          .catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            this.loading = false
          })
      },
    }
  }
</script>
