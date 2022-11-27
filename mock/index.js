import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
// import { prefix } from './tools'
import user from './user'
import table from './table'
import wolist from './wolist'
import tenement from './tenement'
import opreation from './operation'

const mocks = [...user, ...table, ...wolist, ...tenement, ...opreation]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

// for mock server
const responseFake = route => {
  const { url, type, response } = route

  // console.log(`/mock${baseUrl}${url}`)
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      // console.log('request invoke:' + req.path)
      // console.log(route)
     
      res.json(
        Mock.mock(response instanceof Function ? response(req, res) : response)
      )
    }
  }
}

export default mocks.map(route => {
  // console.log(route, 'route')
  return responseFake(route)
})
