import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test'
import { env } from 'cloudflare:workers'
import { http, HttpResponse } from 'msw'
import { describe, it, expect, vi } from 'vitest'
import { network } from './network'
import worker from '../src/index'

describe('DDOS worker', () => {
	it('it should block a route passed in a query parameter', async () => {
		const blockedParams = [
			// /wp-* and subpaths
			{ param:'rest_route', value:'/not-blocked/v2/posts/9999999' },
			{ param:'something', value:'/wp/v2/posts/9999999' },
		]

		for (const param of blockedParams) {
		network.use(
			http.get('https://example.com/blog/', ({ request }) => {
				expect(new URL(request.url).searchParams.get(param.param)).toBe(
					param.value
				)
				return HttpResponse.text('unauthorized', { status: 500 })
			})
		)

		const ctx = createExecutionContext()
		const response = await worker.fetch(
			new Request(`https://example.com/blog/?${param.param}=${encodeURIComponent(param.value)}`),
			env,
			ctx
		)
		await waitOnExecutionContext(ctx)

		expect(response.status).toBe(500)
		expect(await response.text()).toBe('unauthorized')
		}
	})

	it('it should block unauthorized paths with a 500 status', async () => {
		const blockedUrls = [
			// /wp-* and subpaths
			'https://example.com/wp',
			'https://example.com//wp-json',
			'https://example.com/wp-admin',
			'https://example.com/sito/wp-admin',
			'https://example.com/wp-content/uploads',
			'https://example.com/wp-includes/file.php',

			// Specific folder blocks
			'https://example.com/php',
			'https://example.com/php/file',
			'https://example.com/vendor',
			'https://example.com/vendor/package',
			'https://example.com/sites',
			'https://example.com/sites/default',
			'https://example.com/new/subfolder',
			'https://example.com/old',
			'https://example.com/sito/old',
			'https://example.com/home',
			'https://example.com/admin',
			'https://example.com/admin/settings',
			'https://example.com/sito/admin',
			'https://example.com/backup',
			'https://example.com/debug',
			'https://example.com/test',
			'https://example.com/temp',
			'https://example.com/installer',
			'https://example.com/data',
			'https://example.com/setup',
			'https://example.com/config',
			'https://example.com/db',
			'https://example.com/log',
			'https://example.com/.git',
			'https://example.com/.git/log',
			'https://example.com/logs',
			'https://example.com/.vscode/file.js',

			// sftp files
			'https://example.com/sftp.json',
			'https://example.com/sftp-config.json',

			// PHP files
			'https://example.com/file.php',
			'https://example.com/admin/file.php',
			'https://example.com/admin/install.php56',
			'https://example.com/admin/setup.php7',
			'https://example.com/admin/file.PHP',
			'https://example.com/admin/randkeyword.PhP8',
			'https://example.com/admin/file.PhP',
			'https://example.com/admin/main.php8',

			// .env files
			'https://example.com/.env',
			'https://example.com/admin/.env',
			'https://example.com/.env_1',
			'https://example.com/.env.prod',

			// sql files
			'https://example.com/some.sql',
			'https://example.com/some.sql2',
			'https://example.com/some.sql_2',

			// zip files
			'https://example.com/file.zip',
			'https://example.com/file.tar.gz',
		]

		for (const url of blockedUrls) {
			network.use(
				http.get(url, () => {
					return HttpResponse.text('unauthorized', { status: 500 })
				})
			)

			const ctx = createExecutionContext()
			const response = await worker.fetch(new Request(url), env, ctx)
			await waitOnExecutionContext(ctx)

			expect(response.status).toBe(500)
			expect(await response.text()).toBe('unauthorized')
		}
	})
})
