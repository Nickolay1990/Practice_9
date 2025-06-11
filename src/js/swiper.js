import Swiper from 'swiper';
import 'swiper/css';

let citySwiper;

export function initCitySwiper() {
	citySwiper = new Swiper('[data-swiper-cities]', {
		spaceBetween: 10,
		slidesPerView: 'auto',
	});
}
