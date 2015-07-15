module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  function process( code ) {
    return code

      // Embed version
      .replace( /@VERSION/g, grunt.config( "pkg" ).version )

      // Embed homepage url
      .replace( /@HOMEPAGE/g, grunt.config( "pkg" ).homepage )

      // Embed date (yyyy-mm-ddThh:mmZ)
      .replace( /@DATE/g, ( new Date() ).toISOString().substr(0, 10) );
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'dist/xmldom.min.js': ['jsXMLParser/xmldom.js'],
          'dist/xmlsax.min.js': ['jsXMLParser/xmlsax.js'],
          'dist/xmlw3cdom.min.js': ['jsXMLParser/xmlw3cdom.js']
        }
      }
    },
    jshint: {
      js: {
        src: [
          'jsXMLParser/xmldom.js',
          'jsXMLParser/xmlsax.js',
          'jsXMLParser/xmlw3cdom.js'
        ],
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          unused: true,
          boss: true,
          eqnull: true,
          node: true,
          browser: true,             // use document
          evil: true
        }
      }
    },
  });

  grunt.registerTask('default', ['uglify:js']);
  grunt.registerTask('build', ['jshint:js', 'uglify:js']);
};
