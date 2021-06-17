import dotenv from 'dotenv';
import app from './app';

dotenv.config('../.env');
const port = process.env.PORT_DEV || 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
}).on('error', (err) => {
  console.error(err.stack());
});
