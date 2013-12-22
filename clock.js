var SerialTFT = require("serialtft");
var tft = new SerialTFT({});
var moment = require('moment');

tft.on('connect', function(){

	tft.clear_screen();

	tft.font_size(tft.font.small);

	tft.fg_color(tft.color.white); 

	tft.goto_pixel(tft.screen.width_half - 5, 5);
	tft.write('12');

	tft.goto_pixel(tft.screen.width_half - 3 , tft.screen.height - 13)
	tft.write('6')

	tft.goto_pixel(tft.screen.width_half + 50 , tft.screen.height_half - 3)
	tft.write('3')

	tft.goto_pixel(tft.screen.width_half - 54 , tft.screen.height_half - 3)
	tft.write('9')

	tft.fg_color(tft.color.white);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, tft.screen.height_half - 20);

	tft.fg_color(tft.color.black);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, tft.screen.height_half - 22);

	tft.fg_color(tft.color.white);
	tft.draw_filled_circle(tft.screen.width_half, tft.screen.height_half - 1, 3);

	var last_hour = 0;
	var last_minute = 0;
	var last_second = 0;

	setInterval(function(){

		var current_hour = moment().hour();
		var current_minute = moment().minute();
		var current_second = moment().second();

		if (current_hour > 12) { current_hour = current_hour - 12; }
		current_hour = (current_hour * 5) + (current_minute / 10)

		//	Update
		tft.fg_color(tft.color.black);
		if (last_hour != current_hour){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 40, last_hour); }
		if (last_minute != current_minute){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 30, last_minute); }
		if (last_second != current_second){ tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 35, last_second); }

		tft.fg_color(tft.color.white);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 45, current_hour);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 30, current_minute);
		
		tft.fg_color(tft.color.red);
		tft.analog_hand(tft.screen.width_half, tft.screen.height_half, tft.screen.height_half - 35, current_second);

		tft.fg_color(tft.color.white);
		tft.goto_char(1, 14);
		tft.write_line(moment().format("hh:mm:ss"));

		last_hour = current_hour;
		last_minute = current_minute;
		last_second = current_second;

	}, 200);
}) 