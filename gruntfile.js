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
    	copy: {
    		main: {
    			files: [
    			{src: ['bower_components/**/*'], dest: 'public/'}
    			]
    		},
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-install-task');

	// Default task(s).
	grunt.registerTask('default', ['bower_install', 'copy']);

};