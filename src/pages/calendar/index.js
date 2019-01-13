import initCalendar from "../conponent/calendar/main.js";

Page({
	onShow: function() {
		initCalendar();
		console.log(this);
	}
});
