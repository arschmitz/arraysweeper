module.exports = function( grunt ) {
grunt.registerTask( "default", [ "jshint", "jscs" ] );
grunt.registerTask( "build", [ "default", "uglify", "jsdox", "copy", "clean" ] );
};
