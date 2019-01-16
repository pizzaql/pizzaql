import test from 'ava';
import withPage from './helpers/withPage';

const url = 'http://localhost:3000';

test('page title', withPage, async (t, page) => {
	await page.goto(url);
	t.true((await page.title()).includes('PizzaQL'));
});

test('page should contain the submit button', withPage, async (t, page) => {
	await page.goto(url);
	await page.waitFor(1000);
	t.not(await page.$('#__next > div > form > button'), null);
});
