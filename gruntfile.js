module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			files: ['**/*'],
			options: {
				livereload: 3572,
			},
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

};