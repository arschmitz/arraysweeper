this["minesweeper"] = this["minesweeper"] || {};
this["minesweeper"]["prototype"] = this["minesweeper"]["prototype"] || {};
this["minesweeper"]["prototype"]["templates"] = this["minesweeper"]["prototype"]["templates"] || {};

Handlebars.registerPartial("settings", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"row settings-panel settings-panel-hidden\">\n		<div class=\"col-xs-4\">\n			<label for=\"mine-count\">Mine Count: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"mine-count\">  \n		</div>\n		<div class=\"col-xs-4\">\n			<label for=\"board-width\">Board Width: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"board-width\">  \n		</div>\n		<div class=\"col-xs-4\">\n			<label for=\"board-height\">Board Height: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"board-height\">  \n		</div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("toolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"toolbar row\">\n	<div class=\"col-xs-8 remaining\">\n		Remaining: <span class=\"remaining-val\"></span>\n	</div>\n	<div class=\"col-xs reset\" title=\"reset\">\n		&#x27f3;\n	</div>\n	<div class=\"col-xs settings\" title=\"settings\">\n		&#x2699;\n	</div>\n	<div class=\"col-xs help\" title=\"help\">\n		?\n	</div>\n</div>";
},"useData":true}));

this["minesweeper"]["prototype"]["templates"]["board"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "				<div class=\"game-space "
    + this.escapeExpression(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " col-xs\">\n					<div class=\"content\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.bomb : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "					</div>\n				</div>\n";
},"3":function(depth0,helpers,partials,data) {
    return "							&#128163\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "							"
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["minesweeper"]["prototype"]["templates"]["game"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mine\">\n"
    + ((stack1 = this.invokePartial(partials.toolbar,depth0,{"name":"toolbar","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials.settings,depth0,{"name":"settings","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "	<div class=\"board-wrap\">\n		<div class=\"gameboard\">\n\n		</div>\n		<div class=\"screen\">\n\n		</div>\n	</div>\n</div>";
},"usePartial":true,"useData":true});
// This just supports loading in any enviroment
( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory();
	} else {
		root.ArrayCleaner = factory();
  }
}( this, function() {
var ArrayCleaner = function( height, width, count ) {
	this.height = height;
	this.width = height;
	this.count = count;
	this._buildBoard();
};
var arrayCleaner = {
	count: function( row, col ) {
		if ( this._board[ row, col ].state === "revealed" ) {
			return this._board[ row, col ].count;
		}

		return "Reveal space to see count";
	},
	flag: function( row, col, state ) {
		if ( state === undefined ) {
			this.count.flag++;
			return this._board[ row ][ col ].state === "flag";
		}
		this._board[ row ][ col ].state = state ? "flag" : "hidden";
	},
	reveal: function( row, col ) {
		var space = this._board[ row ][ col ];

		if ( space.bomb ) {
			return "Game Over!";
		} else if ( this.count.flag + this.count.hidden === this.count.mine ) {
			return "You Win!";
		}

		this.count.moves++;
		return this._reveal( row, col );
	},
	render: function() {
		var board = [];
		for ( var i = 0; i < this.height; i++ ) {
			board.push( JSON.stringify( this._board[ i ].map( function( space ) {
				return ( space.state === "revealed" ) ? space.count.toString() : ( space.state === "flag" ) ? "!" : "X";
			} ) ) );
		}
		console.log( board.join ( ",\n" ) );
	},
	_getMines: function() {
		this.mines = [];
		for ( var i = 0; i < this.count; i++ ) {
			var valid = false;
			var mine;

			while ( valid === false ) {
				var m = this._getMine();

				if ( this.mines.indexOf( m.row + "," + m.col ) === -1 ) {
					mine = m;
					valid = true;
				}
			}

			this.mines.push( mine.row + "," + mine.col );
		}
	},
	_getMine: function() {
		return {
			row: Math.floor( Math.random() * ( this.height - 1 ) ),
			col: Math.floor( Math.random() * ( this.width - 1 ) )
		};
	},
	_reveal: function( row, col, pending, current ) {
		current = current || 0;
		pending = typeof pending === "object" ? pending : [];
		this._board[ row ][ col ].state = "revealed";
		this.revealCount++;

		for ( var r = row - 1 > 0 ? row - 1 : 0; r <= row + 1; r++ ) {
			for ( var c = col - 1 > 0 ? col - 1 : 0; c <= col + 1; c++ ) {
				if ( r >= 0 && c >= 0 && r < this.height && c < this.width &&
						this._board[ r ][ c ].count === 0 && this._board[ r ][ c ].state !== "revealed" &&
						!this._board[ r ][ c ].bomb && pending.indexOf( r + "," + c ) === -1 ) {
					this._board[ r ][ c ].state = "";
					pending.push( r + "," + c );
				}
			}
		}
		if ( pending.length && pending.length >= current + 1 ) {
			var parts = pending[ current ].split( "," );
			this._reveal(
				parts[ 0 ],
				parts[ 1 ],
				pending,
				current + 1
			);
		}
		return pending;
	},
	_count: function( row, col ) {
		var count = 0;
		for ( var r = row - 1; r <= row + 1; r++ ) {
			for ( var c = col - 1; c <= col + 1; c++ ) {
				if ( this.mines.indexOf( r + "," + c  ) !== -1 ) {
					count++;
				}
			}
		}
		return count;
	},
	_buildBoard: function() {
		var board = [];

		this._getMines();

		for ( var r = 0; r < this.height; r++ ) {
			var row = [];
			for ( var c = 0; c < this.width; c++ ) {
				row.push( {
					state: "hidden",
					bomb: this.mines.indexOf( r + "," + c  ) >= 0,
					count: this._count( r, c )
				} );
			}
			board.push( row );
		}
		this._board = board;
	}
};

var keys = Object.keys( arrayCleaner );

for ( var i = 0; i < keys.length; i++ ) {
	ArrayCleaner.prototype[ keys[ i ] ] = arrayCleaner[ keys[ i ] ];
}

return ArrayCleaner;

} ) );

// This just supports loading in any enviroment
( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "handlebars" ], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory( jQuery );
	} else {
		root.minesweeper = factory( jQuery );
  }
}( this, function( $, Handlebars ) {

var minesweeper = function( element, width, height, count ) {
		this.element = $( element );
		this.count = count || 10;
		this.width = width || 8;
		this.height = height || 8;

		this.refresh();
		

};
$.extend( minesweeper.prototype, {
	refresh: function( getValues ) {
		if ( getValues ) {
			var settings = this.element.find( ".settings-panel" );

			this.width = settings.find( ".board-width" ).val();
			this.height = settings.find( ".board-height" ).val();
			this.count = settings.find( ".mine-count" ).val();
		}
		this.element.html( this.templates.game({}) );
		this.element.find( ".screen" ).removeClass( "success failure" );
		this.getMines( this.count );
		this.buildBoard( this.width, this.height );
		this.renderBoard();
		this.boardElement = this.element.find( ".gameboard" );
		this.bindEvents();
		this.initToolbar();
		
	},
	initToolbar: function() {
		var settings = this.element.find( ".settings-panel" );
		settings.find( ".board-width" ).val( this.width );
		settings.find( ".board-height" ).val( this.height );
		settings.find( ".mine-count" ).val( this.count );
		this.element.find( ".remaining-val" ).html( this.count );
	},
	setHeight: function() {
		var spaces = this.element.find( ".game-space" );

		spaces.height( spaces.eq( 0 ).width() );
	},
	getMines: function( count ) {
		this.mines = [];
		for ( var i = 0; i < count; i++ ) {
			var valid = false;
			var mine;
			while ( valid === false ) {
				var m = this.getMine();
				if ( this.mines.indexOf( m.row + "," + m.col ) === -1 ) {
					mine = m;
					valid = true;
				}
			}

			this.mines.push( mine.row + "," + mine.col );
		}
	},
	revealSpace: function( row, col, pending, current ) {
		var render = typeof pending === "boolean" ? pending : false;
		current = current || 0;
		pending = typeof pending === "object" ? pending : [];
		this.board[ row ][ col ].state = "";

		for ( var r = row - 1 > 0 ? row - 1 : 0; r <= row + 1; r++ ) {
			for ( var c = col - 1 > 0 ? col - 1 : 0; c <= col + 1; c++ ) {
				if ( r >= 0 && c >= 0 && r < this.height && c < this.width &&
						this.board[ r ][ c ].count === 0 && this.board[ r ][ c ].state !== "" &&
						!this.board[ r ][ c ].bomb ) {
					this.board[ r ][ c ].state = "";
					pending.push( { row: r, col: c } );
				}
			}
		}
		if ( pending.length && pending.length >= current + 1 ) {
			this.revealSpace(
				pending[ current ].row,
				pending[ current ].col,
				pending,
				current + 1
			);
		}
		if ( render ) {
			this.renderBoard();
		}
	},
	getMine: function() {
		return {
			row: Math.floor( Math.random() * ( this.height - 1 ) ),
			col: Math.floor( Math.random() * ( this.width - 1 ) )
		};
	},
	getCount: function( row, col ) {
		var count = 0;
		for ( var r = row - 1; r <= row + 1; r++ ) {
			for ( var c = col - 1; c <= col + 1; c++ ) {
				if ( this.mines.indexOf( r + "," + c  ) !== -1 ) {
					count++;
				}
			}
		}
		return count;
	},
	buildBoard: function() {
		var board = [];

		for ( var r = 0; r < this.width; r++ ) {
			var row = [];
			for ( var c = 0; c < this.height; c++ ) {
				row.push( {
					state: "hidden",
					bomb: this.mines.indexOf( r + "," + c  ) >= 0,
					count: this.getCount( r, c )
				} );
			}
			board.push( row );
		}
		this.board = board;
	},
	renderBoard: function() {
		$( ".gameboard" ).html( this.templates.board( this.board ) );
		this.setHeight();
	},
	click: function( e ) {
		var col = $( this ).index();
		var row = $( this ).parent().index();
		var space = e.data.board[ row ][ col ];
		var element = e.data.element;

		if ( e.which === 1 ) {
				if ( space.bomb === true ) {
					element.find( ".hidden" ).removeClass( "hidden" );
					element.find( ".screen" ).addClass( "failure" );
				} else {
					e.data.revealSpace( row, col, true );
				}
		} else {
			space.state = ( space.state === "hidden" ||
				( space.bomb === false && space.state === "" ) ) ?
					"flag" :
					"hidden";

			e.data.renderBoard();
			element.find( ".remaining-val" ).html( e.data.count - element.find( ".flag" ).length  );
		}
		e.data.checkWin();

	},
	checkWin: function() {
		if ( this.element.find( ".remaining-val" ).html() === "0" &&
				this.element.find( ".hidden" ).length === 0 ) {
			this.element.find( ".screen" ).addClass( "success" );
		}
	},
	bindEvents: function() {
		var that = this;
		this.element.find( ".reset" ).on( "click", this, function() {
			that.refresh( true );
		} );
		this.element.find( ".settings" ).on( "click", this, function() {
			that.element.find( ".settings-panel" ).toggleClass( "settings-panel-hidden" );
		} );
		this.boardElement.on( "mouseup", ".hidden, .flag", this, this.click );

		this.boardElement.on( "contextmenu", ".hidden, .flag", this, function() {
			return false;
		} );
		$( window ).on( "resize", function() {
			that.setHeight();
		} );
	}
} );

return minesweeper;

} ) );
