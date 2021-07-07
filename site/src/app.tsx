import './app.less';
import { NotFound } from '@tuya/dumi-theme-tuya/exports';

export function patchRoutes({ routes }) {
  routes[2].routes.push({
    path: '*',
    component: NotFound,
  });
}
