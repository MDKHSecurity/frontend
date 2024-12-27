import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        csp: {
            directives: {
                'script-src': ['self']
            },
            mode: 'auto',
        }
    }
};

export default config;
