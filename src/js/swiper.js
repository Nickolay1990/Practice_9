import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Scrollbar } from 'swiper/modules';

export function initCitySwiper() {
	const citySwiper = new Swiper('[data-swiper-cities]', {
		modules: [Navigation],
		spaceBetween: 10,
		slidesPerView: 'auto',
		navigation: {
			nextEl: '[data-swiper-right]',
			prevEl: '[data-swiper-left]',
		},
	});
}

export function initMoreInfoSwiper() {
	const moreInfoSwiper = new Swiper('[data-swiper-more-info]', {
		modules: [Scrollbar],
		spaceBetween: 30,
		slidesPerView: 2,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true, // если нужно перетаскивать
		},
	});
}
