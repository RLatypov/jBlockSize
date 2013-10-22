(function( $ ){
	$.fn.jBlockSize = function( options ) {

		var s = $.extend({
			type                : 'max',    //string : min,max
			side                : 'h',      //string : w,h,wh
			child               : 'li',     //string
			outerHeight         : false,    //boolean
			includeHeightMargin : false,    //boolean
			outerWidth          : false,    //boolean
			includeWidthMargin  : false,    //boolean
			responsive          : false     //boolean
		}, options);

		var childes = s.child.split(',');

		var setHeight = function(container) {
			for (var i = 0; i < childes.length; i++) {
				var height = 0;
				$(childes[i],container).css('height','auto').each(function () {
					if (s.type == 'max') {
						height = Math.max(height, $(this).height());
					}
				}).height(height);
			}
		};

		var responsive = function(container) {
			var itemsParent = $(container),
				items = itemsParent.children(),
				itemsCount = items.length,
				item = $(items[0]),
				countInString = Math.floor(itemsParent.width() / item.width());

			items.filter(function(index) {
				if(index % countInString == 0) {
					var sliceStart = items.index($(this)),
						sliceEnd = sliceStart + countInString;

					if( sliceEnd >= itemsCount ) {
						sliceEnd = itemsCount;
					}
					setHeight(items.slice(sliceStart,sliceEnd));
				}
			});
		};

		return this.each(function() {
			if(s.side == 'h') {
				if(s.responsive) {
					responsive(this);
				} else {
					setHeight(this);
				}
			}
		});
	};

})( jQuery );