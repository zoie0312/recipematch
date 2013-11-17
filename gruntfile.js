module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: [
			'js/**/*.js',
             'app.js'
            ]
      		/*options: {
      			reporter: 'reporter.js'
      		}*/
    	},
		watch: {
			files: ['**/*'],
			options: {
				livereload: 3572,
			},
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

};