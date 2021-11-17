import axios from 'axios'

function makeRequest (url, type, config = {}) {
    const username = 'user'
    const password = 'user'
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    config = { 
        // withCredentials: true
        url,
        baseURL: process.env.VUE_APP_APIPATH+"api/",
        method: type,
        auth: {
            username,
            password
          },
        ...config
    }
    console.log(config)
    return axios.request(config)
}

function baseUrl() {
  return process.env.VUE_APP_APIPATH+'api/';
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

function formDataRequest(url, data, config = {})
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

  return makeRequest(url, 'POST', conf)
}

function loader()
{
  console.log()
}

// export default {makeRequest}

export default {
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