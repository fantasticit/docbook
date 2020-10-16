export const loadConfig = () => import(dir + '/config.js').then(res => res.default)
