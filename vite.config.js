	import { sveltekit } from '@sveltejs/kit/vite';
	import { defineConfig } from 'vite';

	export default defineConfig({
		server: {
			https: {
				key: './front-key.pem',
				cert: './front-cert.pem',
			}
		},
		plugins: [sveltekit()]
	});
