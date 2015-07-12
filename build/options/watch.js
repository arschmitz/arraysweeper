module.exports = {
	js: {
		files: [ "js/*.js" ],
		tasks: [ "concat" ],
		options: {
			spawn: false,
			interupt: true
		}
	},
	templates: {
		files: [ "templates/*.hbs" ],
		tasks: [ "handlebars", "concat" ],
		options: {
			spawn: false,
			interupt: true
		}
	},
	css: {
		files: [ "css/*.css" ],
		tasks: [ "concat:css", "cssmin" ],
		options: {
			spawn: false,
			interupt: true
		}
	}
};
