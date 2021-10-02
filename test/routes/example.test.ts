import { test } from 'tap';
import { build } from '../helper';

test('example is loaded', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/',
  });

  t.equal(res.payload, 'this is an example');
});
