// This just supports loading in any enviroment
( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		/**
		* A module for creating an array based minesweeper game.
		* @module ArraySweeper
		*/
		define( [], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory();
	} else {
		root.ArraySweeper = factory();
  }
}( this, function() {
/**
* @alias module:ArraySweeper
* @param {number} height - Height of the board to create.
* @param {number} width - Width of the board to create.
* @param {number} count - The number of mines to place on the board.
*/
var ArraySweeper = function( height, width, count ) {
	this.height = height;
	this.width = width;
	this.count = count;
	this._buildBoard();
};
var arraySweeper = {

	/**
	* Get the mine count for the current space
	* @param {number} row - The row number for the space.
	* @param {number} col - The column number for the space.
	*/
	mineCount: function( row, col ) {
		if ( this._board[ row ][ col ].state === "revealed" ) {
			return this._board[ row ][ col ].count;
		}

		return "Reveal space to see count";
	},

	/**
	* Get or set the flag status of the space
	* @param {number} row - The row number for the space.
	* @param {number} col - The column number for the space.
	* @param {boolean} state - OPTIONAL if included set the flag state for space other wise get it.
	*/
	flag: function( row, col, state ) {
		if ( state === undefined ) {
			this.count.flag++;
			return this._board[ row ][ col ].state === "flag";
		}
		this._board[ row ][ col ].state = state ? "flag" : "hidden";
	},

	/**
	* Reveal the space
	* @param {number} row - The row number for the space.
	* @param {number} col - The column number for the space.
	*/
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

	/**
	* Render the board - This logs a textual representation to the console
	*/
	render: function() {
		var board = [];
		for ( var i = 0; i < this.height; i++ ) {
			board.push( JSON.stringify( this._board[ i ].map( this._renderMap ) ) );
		}
		console.log( board.join ( ",\n" ) );
	},

	/**
	* Get the board object - This should not be used by players only when implementing the api
	* DONT CHEAT :-)
	*/
	getBoard: function() {
		return this._board;
	},

	_renderMap: function( space ) {
		return space.state === "revealed" ?
			space.count.toString() :
			( space.state === "flag" ) ? "!" : "X";
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
						this._board[ r ][ c ].count === 0 &&
						this._board[ r ][ c ].state !== "revealed" &&
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

var keys = Object.keys( arraySweeper );

for ( var i = 0; i < keys.length; i++ ) {
	ArraySweeper.prototype[ keys[ i ] ] = arraySweeper[ keys[ i ] ];
}

return ArraySweeper;

} ) );
