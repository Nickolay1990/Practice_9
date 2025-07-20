import Swiper from 'swiper';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

let citySwiper;

export function initCitySwiper() {
	citySwiper = new Swiper('[data-swiper-cities]', {
		modules: [Navigation],
		spaceBetween: 10,
		slidesPerView: 'auto',
		navigation: {
			nextEl: '[data-swiper-right]',
			prevEl: '[data-swiper-left]',
		},
	});
}

let moreInfoSwiper;

export function initMoreInfoSwiper() {
	moreInfoSwiper = new Swiper('[data-swiper-more-info]', {
		spaceBetween: 30,
		slidesPerView: 2,
	});
}
