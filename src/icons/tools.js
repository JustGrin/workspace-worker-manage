const modulesFiles = require.context('./svg', true, /\.svg$/)

// svg列表
export const svgList = modulesFiles.keys().map(modulePath => modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))

// png列表
export const pngList = () => {
  return [3, 4]
}
