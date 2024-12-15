import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test'
import { describe, it, expect } from 'vitest'
import worker from '../src/index'

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>
const env = {}

describe('DDOS worker', () => {
	it('should block unauthorized paths with a 500 status', async () => {
		const blockedUrls = [
			// /.well-known/ and subpaths
			'https://example.com/.well-known',
			'https://example.com/.well-known/something',

			// /wp-* and subpaths
			'https://example.com/wp-admin',
			'https://example.com/sito/wp-admin',
			'https://example.com/wp-content/uploads',
			'https://example.com/wp-includes/file.php',

			// Specific folder blocks
			'https://example.com/new',
			'https://example.com/new/subfolder',
			'https://example.com/old',
			'https://example.com/sito/old',
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
			'https://example.com/logs',

			// PHP files
			'https://example.com/file.php',
			'https://example.com/admin/file.php',

			// .env files
			'https://example.com/.env',
			'https://example.com/admin/.env',
			'https://example.com/sito/.env',
		]

		for (const url of blockedUrls) {
			const request = new IncomingRequest(url)
			const ctx = createExecutionContext()
			const response = await worker.fetch(request, env, ctx)
			await waitOnExecutionContext(ctx)

			expect(response.status).toBe(500)
		}
	})
})
