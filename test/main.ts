import '../init.ts'
import { green, red } from 'https://deno.land/std@0.85.0/fmt/colors.ts'
import { tools } from '../mod.ts'

// Just some quick logs to make sure things are working
hackle.error('Something went wrong')
hackle.warn('Is that right?')
hackle.notice('Maybe not though')
hackle.info("No, it's wrong.")
hackle.debug("'hackle.debug' was just called")

async function main() {
	hackle.logStack()
}
main()

hackle.setLogLevel('info')
print('should not show')

hackle.setLogLevel('debug')
print('should show')

hackle.setLoggers([tools.consoleLogger, tools.makeFileLogger('.log', { prependTime: true })])
print('should be in file')

hackle.addScope({
	name: 'download',
	level: 'notice',
	prepend: `${green('Download')}`,
})

const notifyDownload = hackle.scope('download')

notifyDownload('https://something.com')

// For the screenshot
hackle.error('An error message')
hackle.warn('A warn message')
hackle.notice('A notice message')
hackle.info('An info message')
print('A debug message')

// Override the default hackle.error
hackle.addScope({
	name: 'default-error',
	messageMap(message) {
		return red(tools.defaultStringify(message))
	},
	level: 'error',
})

hackle.error('all red')
