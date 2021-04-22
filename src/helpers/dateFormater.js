export const formatDate = function(dateString) {
	const splitDateString = dateString.split('-');

	const weekDay = splitDateString[0];
	const date = splitDateString[2];

	const formattedDate = `${weekDay} ${date}`;

	return formattedDate;
};