export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)

		// Define regex patterns for broader directory and file matches
		const blockedPatterns = [
			/^\/(?:.+\/)?wp.*(\/.*)?$/, // Block any path starting with wp and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?wordpress(\/.*)?$/, // Block /wordpress and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?php(\/.*)?$/, // Block /php and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?vendor(\/.*)?$/, // Block /vendor and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?modules(\/.*)?$/, // Block /modules and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?sites(\/.*)?$/, // Block /sites and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?site(\/.*)?$/, // Block /site and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?var(\/.*)?$/, // Block /var and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?uploads(\/.*)?$/, // Block /uploads and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?files(\/.*)?$/, // Block /files and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?template(\/.*)?$/, // Block /template and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?login(\/.*)?$/, // Block /template and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?resetpass(\/.*)?$/, // Block /resetpass and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?new(\/.*)?$/, // Block /new and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?old(\/.*)?$/, // Block /old and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?home(\/.*)?$/, // Block /home and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?cms(\/.*)?$/, // Block /cmd and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?feed(\/.*)?$/, // Block /feed and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?admin(\/.*)?$/, // Block /admin and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?backup(\/.*)?$/, // Block /backup and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?bk(\/.*)?$/, // Block /bk and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?bc(\/.*)?$/, // Block /bc and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?debug(\/.*)?$/, // Block /debug and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?test(\/.*)?$/, // Block /test and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?temp(\/.*)?$/, // Block /temp and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?media(\/.*)?$/, // Block /media and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?installer(\/.*)?$/, // Block /installer and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?data(\/.*)?$/, // Block /data and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?setup(\/.*)?$/, // Block /setup and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?config(\/.*)?$/, // Block /config and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?db(\/.*)?$/, // Block /db and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?.git(\/.*)?$/, // Block /git and its subpaths, allowing for preceding directories
			/^\/(?:.+\/)?logs?(\/.*)?$/, // Block /log or /logs and their subpaths, allowing for preceding directories
			/^\/(?:.+\/)?.vscode?(\/.*)?$/, // Block /.vscode and their subpaths, allowing for preceding directories
			/^\/(?:.+\/)?sftp.*(\/.*)?$/, // Block files like sftp.json or sftp-config.json
			/\.php([0-9]*|[a-z]*)?$/i, // Block any PHP files (e.g., .php, .php7, .php56, .PhP, .pHpScript)
			/\.env.*$/i, // Block .env files
			/\.sql.*$/i, // Block .sql files
			/\.zip.*$/i, // Block .zip files
			/\.tar.*$/i, // Block .tar files
		]

		for (const pattern of blockedPatterns) {
			if (pattern.test(url.pathname)) {
				return new Response('unauthorized', { status: 500 })
			}
		}

		return fetch(request)
	},
} satisfies ExportedHandler<Env>
