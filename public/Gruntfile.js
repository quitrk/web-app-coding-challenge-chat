module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['styles.scss'],
          dest: 'dist',
          ext: '.css'
        }]
      }
    },
    
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-pusher/angular-pusher.js',
          'bower_components/moment/moment.js',
          'bower_components/angular-moment/angular-moment.js',
          'bower_components/underscore/underscore.js',
          'app/js/**/*.js'
        ],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.js': [ 'dist/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', [
    'sass',
    'concat'
  ]);

  grunt.registerTask('production', [
    'sass',
    'concat',
    'uglify'
  ]);
};