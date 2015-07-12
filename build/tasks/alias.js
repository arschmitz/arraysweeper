module.exports = function( grunt ) {

grunt.registerTask( "default", [ "test", "build" ] );
grunt.registerTask( "build", [ "concat", "cssmin", "uglify", "makepot" ] );
grunt.registerTask( "test", [ "jshint", "jscs", "csslint", "csscomb" ] );

};
