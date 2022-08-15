module.exports = {
	preset: 'jest-expo',
	testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		'jest-styled-components',
	],
	collectCoverage: true,
	collectCoverageFrom: ['scr/**/*.tsx', '!scr/**/*.spec.tsx'],
	coverageReporters: ['lcov'],
};
