import userRoute from './user';
import calcRoute from './calc';
import historyRoute from './history';

import { errorResponse } from '../utils/response';

export default function routeManager(app) {
  // List of handled routes.
  app.use('/user', userRoute);
  app.use('/calc', calcRoute);
  app.use('/history', historyRoute);

  // Handle invalid url (404 status) - must be the last one.
  app.use((req, res) => errorResponse(res, 'Invalid url', 404));
}
