export default {
	favoritesButton: document.querySelector('[data-add-favorites]'),
	cityInput: document.querySelector('[data-input-city]'),
	favoritiesList: document.querySelector('[data-favorities-list]'),
	swiperNavButtons: document.querySelectorAll('.header-wrapper-nav-button'),
	searchButton: document.querySelector('[data-search-button]'),
	curentTemp: document.querySelector('.days-current-temp'),
	currentLocation: document.querySelector('.days-city-title'),
	threeCurrentLocation: document.querySelector('.three-days-city-title'),
	daysWrapper: document.querySelector('.days-wrapper'),
	maxTempText: document.querySelector('[data-max-temp]'),
	minTempText: document.querySelector('[data-min-temp]'),
	currentDate: document.querySelector('.date-day'),
	currentDay: document.querySelector('.day-week'),
	currentMonth: document.querySelector('.date-month'),
	currentTime: document.querySelector('.date-time'),
	sunRise: document.querySelector('.sunrise'),
	sunSet: document.querySelector('.sunset'),
	sunBlock: document.querySelector('.sun-rise-set'),
	switchThreeDays: document.querySelector('[data-switch-three-days]'),
	switchOneDay: document.querySelector('[data-switch-one-day]'),
	homeSection: document.querySelector('.home'),
	citeBlock: document.querySelector('[data-cite-block]'),
	dateBlock: document.querySelector('.date-wrapper'),
	threeDayContainer: document.querySelector('.three-day-container'),
	threeDaysCityWeekday: document.querySelectorAll(
		'.three-days-city-list-weekday'
	),
	threeDaysDate: document.querySelectorAll('.three-days-city-list-date'),
	threeDaysElemetsForImage: document.querySelectorAll(
		'.three-days-city-list-hight-item'
	),
	threeDaysElementsForMinTemp: document.querySelectorAll(
		'.three-days-city-list-min-temp-deg'
	),
	threeDaysElementsForMaxTemp: document.querySelectorAll(
		'.three-days-city-list-max-temp-deg'
	),
	moreInfoButtons: document.querySelectorAll(
		'.three-days-city-list-more-button'
	),
	hideInfoButtons: document.querySelectorAll(
		'.three-days-city-list-hide-button'
	),
	moreInfoListItems: document.querySelectorAll(
		'.three-days-more-info-list-item-wrapper'
	),
	moreInfoCurrentTemp: document.querySelectorAll(
		'.three-days-more-info-list-item-current-temp'
	),
	moreInfoPressure: document.querySelectorAll(
		'.three-days-more-info-list-item-esential-block-pressure-data'
	),
	moreInfoHumidity: document.querySelectorAll(
		'.three-days-more-info-list-item-esential-block-humidity-data'
	),
	moreInfoWind: document.querySelectorAll(
		'.three-days-more-info-list-item-esential-block-wind-data'
	),
	moreInfoBlock: document.querySelector('.three-days-more-info-wrapper'),
	chartButton: document.querySelector('.chart-button'),
	chartButtonClose: document.querySelector('.chart-button-close'),
	chartContainer: document.querySelector('.chart-container'),
};
