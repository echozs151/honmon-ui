import axios from 'axios'
let _helpRef;
function makeRequest (url, type, config = {}) {
    const username = 'user'
    const password = 'user'
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    _helpRef = this
    config = { 
        // withCredentials: true,
        url,
        baseURL: process.env.VUE_APP_APIPATH+"api/",
        method: type,
        auth: {
            username,
            password
          },
        ...config
    }
    return axios.request(config).finally(() => {
      loader()
    })
}

function baseUrl(api = true) {
  return process.env.VUE_APP_APIPATH+ (api ? 'api/' : '');
}

function uploadFile(file, config = {})
{
  const formData = new FormData()
  const url = 'upload';
  formData.append('file', file)
  let conf = {
    ...config,
    headers: {
      'content-type': 'multipart/form-data'
    }
   }

  return makeRequest(url, 'POST', conf)
}

function formDataRequest(url, data, config = {}, req = "POST")
{
  var form_data = new FormData();
      for ( var key in data ) {
          form_data.append(key, data[key]);
      }

  let conf = {
    ...config,
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: form_data
   }

  return makeRequest(url, req, conf)
}

function loader()
{
  if (_helpRef && _helpRef.comp) {
    _helpRef.comp.$root.$emit("pageLoader", false)
  }
  
}

// export default {makeRequest}

export default {
  comp: null,
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app = {'test': 'test'}
  },
  makeRequest,
  uploadFile,
  formDataRequest,
  loader,
  baseUrl
  }