'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({

    jscs: {
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'app/js/**/*.js', 'lib/*.js', 'test/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'app/js/**/*.js', 'lib/*.js', 'test/**/*.js'],
    },

    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: true,
        reporter: 'tap'
      },
      src: ['test/api/user_test.js', 'test/api/teacher_test.js', 'test/api/classes_test.js', 'test/api/quiz_test.js']
    },

    clean: {
      src: ['build/']
    },

    copy: {
      dev: {
        cwd: 'app/',
        expand: true,
        src: ['**/*.html', '**/*.css'],
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/client_bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*.js'],
        dest: 'test/angular_testbundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.config.js'
      },
      continuous: {
        configFile: 'karma.config.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('test:client', ['test', 'browserify:test', 'karma:unit']);
  grunt.registerTask('build', ['jshint', 'clean', 'copy:dev', 'browserify:dev']);
  grunt.registerTask('default', ['test']);
};
