export const resolveConfig = () => CONFIG_PATH ? import(CONFIG_PATH).then(res => res.default).catch(() => ({})) : Promise.resolve({})
export const resolveRoutes = () => import(ROUTES_PATH).then(res => res.default).catch(() => ([]))
