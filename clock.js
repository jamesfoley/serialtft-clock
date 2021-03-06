var SerialTFT = require("serialtft");
var tft = new SerialTFT({});
var moment = require('moment');

// Wait for screen connection
tft.on('connect', function(){

	// Clear the screen before we do anything
	tft.clear_screen();

	// Set the font to small
	tft.font_size(tft.font.small);

	// Set the clock face number color
	tft.fg_color(tft.color.white); 

	// Draw clock face numbers
	tft.goto_pixel(tft.screen.width_half - 5, 5);
	tft.write('12');

	tft.goto_pixel(tft.screen.width_half - 3 , tft.screen.height - 13)
	tft.write('6')

	tft.goto_pixel(tft.screen.width_half + 50 , tft.screen.height_half - 3)
	tft.write('3')

	tft.goto_pixel(tft.screen.width_half - 54 , tft.screen.height_half - 3)
	tft.write('9')

	// Draw the clock face frame
	tft.fg_color(tft.color.white);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, tft.screen.height_half - 20);

	tft.fg_color(tft.color.black);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, tft.screen.height_half - 22);

	tft.fg_color(tft.color.white);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, 3);

	// Some variables for the loop
	var last_hour = moment().hour();
	var last_minute = moment().minute();
	var last_millisecond = (moment().second() * 1000) + moment().millisecond();

	// Paint loop, if you paint a lot in the loop it could get a bit funky. Slowing the loop helps
	setInterval(function(){

		// Define current time, we use MS here for a smooth hand
		var current_hour = moment().hour();
		var current_minute = moment().minute();
		var current_millisecond = (moment().second() * 1000) + moment().millisecond();

		// Convert time to 12 hour
		if (current_hour > 12) { current_hour = current_hour - 12; }
		current_hour = (current_hour * 5) + (current_minute / 10)

		// Clear hands
		tft.fg_color(tft.color.black);
		if (last_hour != current_hour){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 40, last_hour); }
		if (last_minute != current_minute){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 30, last_minute); }
		if (last_millisecond != current_millisecond){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 35, last_millisecond, 60000.0); }

		// Redraw hands
		tft.fg_color(tft.color.white);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 45, current_hour);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 30, current_minute);

		tft.fg_color(tft.color.red);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 35, current_millisecond, 60000.0);

		// Draw time in bottom left
		tft.fg_color(tft.color.white);
		tft.goto_char(1, 14);
		tft.write_line(moment().format("hh:mm:ss"));

		// Set loop variables
		last_hour = current_hour;
		last_minute = current_minute;
		last_millisecond = current_millisecond;

	}, 250);

}) 