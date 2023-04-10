
export function imageToPromise(image: HTMLImageElement) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (e) => reject(e.error));
	});
}
