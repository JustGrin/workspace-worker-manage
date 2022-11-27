import apiUrl from '../src/api/url'

export const api = apiUrl

/*
 *data array  数据
 *other object 筛选条件
 *timeName string 数据里面代表时间的字段名
 * [startTimeName, endTimeName]  string other里面代表时间的参数的字段名
 */

export const handleFilter = (
  data,
  other = {},
  timeName = 'creatTime'
  //   startTimeName = 'startTime',
  //   endTimeName = 'endTime'
) => {
  // 查询表数据
  //   const startTime = {}.hasOwnProperty.call(other, startTimeName) ? other[startTimeName] : false;
  //   const endTime = {}.hasOwnProperty.call(other, endTimeName) ? other[endTimeName] : false;
  //   startTime && endTime ? (other[timeName] = [startTime, endTime]) : true;

  for (const key in other) {
    // 遍历请求参数
    if ({}.hasOwnProperty.call(other, key)) {
      data = data.filter(item => {
        // 遍历数据
        if ({}.hasOwnProperty.call(item, key)) {
          if (key === timeName) {
            const start = new Date(other[key][0]).getTime()
            const end = new Date(other[key][1]).getTime()
            const now = new Date(item[key]).getTime()
            if (start && end) {
              return now >= start && now <= end
            }
            return true
          }
          return (
            String(item[key])
              .trim()
              .indexOf(decodeURI(other[key]).trim()) > -1
          )
        }
        return true
      })
    }
  }
  return data
}

/*
 * data  array 要返回的数据
 * current  number  页码
 * size  number  页容量
 *
 */
export const pageJson = (alldata, { current = 1, size = 10, ...params }, headers = []) => {
  // 赛选
  const data = handleFilter(alldata, params)
  const records = data.slice((current - 1) * size, current * size)
  const total = data.length

  return {
    data: {
      headers,
      records,
      total,
      size: Number(size),
      current: Number(current),
      orders: [],
      hitCount: false,
      searchCount: true,
      pages: Math.ceil(total / size)
    },
    retCode: '200',
    retMsg: '查询成功'
  }
  //   return {
  //     data,
  //     pageNo: Number(current),
  //     pageSize: Number(size),
  //     totalPages: parseInt(data.length / size, 10),
  //     totalCount: data.length,
  //     retCode: '200',
  //     retMsg: '查询成功',
  //   }
}

/*
 * data  array 要返回的数据
 * success  Beal  页码
 * msg  String  页容量
 *
 */
export const getResponse = res => {
  const { data = null, success = true, msg } = res || {}
  const sendData = {}
  if (success) {
    sendData.retCode = '200'
    sendData.retMsg = msg || '成功'
  } else {
    sendData.retCode = '500'
    sendData.retMsg = msg || '失败'
  }

  return {
    ...sendData,
    data
  }
}
