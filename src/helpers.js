import axios from 'axios'

function makeRequest (url, type, config = {}) {
    const username = 'user'
    const password = 'user'
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    config = {...config, 
        // withCredentials: true
        url,
        baseURL: "http://localhost:8080/api/",
        method: type,
        auth: {
            username,
            password
          }
    }
    return axios.request(config)
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
    makeRequest
  }