import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function getErrorMessage() {
	iziToast.error({
		message: 'City not found',
		maxWidth: '200px',
		position: 'topRight',
		messageSize: '10',
		icon: '',
		progressBar: false,
		timeout: 1000,
		backgroundColor: 'transparent',
		close: false,
		messageColor: 'red',
	});
}

export function getSuccssesMessage() {
	iziToast.success({
		message: 'City added to favorites',
		maxWidth: '200px',
		position: 'topRight',
		messageSize: '10',
		icon: '',
		progressBar: false,
		timeout: 1000,
		backgroundColor: 'transparent',
		close: false,
		messageColor: 'green',
	});
}
