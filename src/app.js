import App from './App.svelte';
import { generate } from './Core'
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

(async () => {
	const start = Date.now()
	console.log(await generate('password', { ID: 'myself', name: 'username' }))
	console.log(Date.now() - start)
})()

export default app;