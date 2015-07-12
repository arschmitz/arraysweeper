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
