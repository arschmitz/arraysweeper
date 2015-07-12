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
