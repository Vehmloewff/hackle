import { addTask, go, runFile, runWatchIf } from 'https://deno.land/x/dirt/mod.ts'

addTask('default', async (_, ctx) => {
	await runWatchIf(ctx.flags.watch, '**/*.ts', async () => {
		await runFile('test/main.ts', { permissions: { read: true, write: true } })
	})
})

go()
