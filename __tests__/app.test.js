import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import timer from 'timer-promise';
import { html } from 'js-beautify';

import app from '../src/app';

const fixuturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => html(document.body.innerHTML);


beforeEach(() => {
  const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  app();
});

test('application', async () => {
  expect(getTree()).toMatchSnapshot();

  await timer.start(200);
  expect(getTree()).toMatchSnapshot();
});
