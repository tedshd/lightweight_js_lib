module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        watch: {
          html: {
            files: ['*.html'],
            // tasks: ['concat:js', 'uglify:js'],
            options: {
              livereload: true,
            }
          },
          js: {
            files: ['javascript/*.js'],
            // tasks: ['concat:js', 'uglify:js'],
            options: {
              livereload: true,
            }
          }
          /*css: {
            files: ['less/*.less'],
            tasks: ['less:style'],
            options: {
              livereload: true,
            }
          }*/
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
}
