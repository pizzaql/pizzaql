import test from 'ava';
import withPage from './helpers/withPage';

const url = 'http://localhost:3000';

test('place an order', withPage, async (t, page) => {
	await page.goto(url, {waitUntil: 'load', timeout: 0});

	const type = '#__next > div > form > div > label:nth-child(1) > div > select';
	const size = '#__next > div > form > div > label:nth-child(2) > div > select';
	const dough = '#__next > div > form > div > label:nth-child(3) > div > select';
	const name = '#__next > div > form > label:nth-child(4) > input';
	const phone = '#__next > div > form > label:nth-child(5) > input';
	const city = '#__next > div > form > label:nth-child(6) > input';
	const street = '#__next > div > form > label:nth-child(7) > input';
	const time = '#__next > div > form > label:nth-child(9) > div > select';
	const submit = '#__next > div > form > button';

	await page.waitFor(2000);
	await page.select(type, 'Margharita');
	await page.select(size, 'Medium');
	await page.select(dough, 'Thin');
	await page.waitFor(500);
	await page.click(name);
	await page.keyboard.type('Mark Suckerberg');
	await page.waitFor(500);
	await page.click(phone);
	await page.keyboard.type('666666666');
	await page.waitFor(500);
	await page.click(city);
	await page.keyboard.type('Menlo Park');
	await page.waitFor(500);
	await page.click(street);
	await page.keyboard.type('1 Hacker Way');
	await page.waitFor(500);
	await page.select(time, 'ASAP');

	await page.waitFor(1500);
	await page.click(submit);

	await page.waitFor(7500);
	const isSuccess = async () => {
		try {
			await page.waitForSelector('#__next > div > div > input');
			return true;
		} catch (error) {
			console.log('The element didn\'t appear.');
			return false;
		}
	};

	t.true(await isSuccess());
});
