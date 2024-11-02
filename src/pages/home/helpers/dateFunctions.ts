export const isToday = (date: string): boolean => {
	const today = new Date();
	const dueDateOfNote = new Date(date);
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth();
	const todayDay = today.getDate();
	return (
		dueDateOfNote.getFullYear() === todayYear &&
		dueDateOfNote.getMonth() === todayMonth &&
		dueDateOfNote.getDate() === todayDay
	);
};

const getWeekOfYear = (date: Date): number => {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const days = Math.floor(
		(date.valueOf() - startOfYear.valueOf()) / (24 * 60 * 60 * 1000)
	);
	const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
	return weekNumber;
};

export const isThisWeek = (date: string): boolean => {
	const today = new Date();
	const dueDateOfNote = new Date(date);
	const todayWeek = getWeekOfYear(today);
	return getWeekOfYear(dueDateOfNote) === todayWeek && !isToday(date);
};
