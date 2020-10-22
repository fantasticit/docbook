export const resolveConfig = () => import(CONFIG_PATH).then(res => res.default)
export const resolveRoutes = () => import(ROUTES_PATH).then(res => res.default)
