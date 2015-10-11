
'use strict';


module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    htmlFile: 'app/index.html'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Automatically inject Bower components into the HTML file
    wiredep: {
        options: {
            overrides: {
                'jquery-ui': {
                    main: [ "jquery-ui.min.js", "themes/base/jquery-ui.min.css" ]
                }
            }
        },
        default: {
            src: ['<%= config.htmlFile %>'],
        }
      }

  });


//  Register urank tasks
    /*  INSTALL  */

  grunt.registerTask('default', [
      'wiredep'
  ]);



};
