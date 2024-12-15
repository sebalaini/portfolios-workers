export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)

		// Define regex patterns for broader directory and file matches
		const blockedPatterns = [
			/^\/(?:.+\/)?\.well-known(\/.*)?$/, // Block /.well-known/ and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?wp-.*(\/.*)?$/, // Block any path starting with wp- and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?new(\/.*)?$/, // Block /new and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?old(\/.*)?$/, // Block /old and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?admin(\/.*)?$/, // Block /admin and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?backup(\/.*)?$/, // Block /backup and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?debug(\/.*)?$/, // Block /debug and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?test(\/.*)?$/, // Block /test and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?temp(\/.*)?$/, // Block /temp and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?installer(\/.*)?$/, // Block /installer and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?data(\/.*)?$/, // Block /data and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?setup(\/.*)?$/, // Block /setup and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?config(\/.*)?$/, // Block /config and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?db(\/.*)?$/, // Block /db and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?logs?(\/.*)?$/, // Block /log or /logs and their subpaths, allowing for preceding directories
			/\.php$/, // Block any PHP file
			/\.env$/, // Block .env files specifically
		]

		for (const pattern of blockedPatterns) {
			if (pattern.test(url.pathname)) {
				return new Response('unauthorized', { status: 500 })
			}
		}

		return fetch(request)
	},
} satisfies ExportedHandler<Env>
