// place files you want to import through the `$lib` alias in this folder.
import EmblaCarousel from 'embla-carousel';
import type { Action } from 'svelte/action';
import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel';
import type { Writable } from 'svelte/store';

export interface FileProps {
	file: File;
	presignedUrl: string;
	viewSize: string;
	id: string;
	loadingProgress: number;
}

export type EmbaOptionsActionType = EmblaOptionsType &
	Partial<{
		plugins: EmblaPluginType[];
		store: Writable<EmblaCarouselType>;
	}>;

const action: Action<HTMLElement, EmbaOptionsActionType> = (node, options = {}) => {
	const plugins = options?.plugins ?? [];
	const embla = EmblaCarousel(node, options, plugins);
	options?.store?.set(embla);

	const init = () => node.dispatchEvent(new CustomEvent('e-init', { detail: embla }));
	const reinit = () => node.dispatchEvent(new CustomEvent('e-reinit'));
	const destroy = () => node.dispatchEvent(new CustomEvent('e-destroy'));
	const select = () => node.dispatchEvent(new CustomEvent('e-select'));
	const scroll = () => node.dispatchEvent(new CustomEvent('e-scroll'));
	const resize = () => node.dispatchEvent(new CustomEvent('e-resize'));
	const pointerUp = () => node.dispatchEvent(new CustomEvent('e-pointer-up'));
	const pointerDown = () => node.dispatchEvent(new CustomEvent('e-pointer-down'));

	embla.on('init', init);
	embla.on('reInit', reinit);
	embla.on('destroy', destroy);
	embla.on('select', select);
	embla.on('scroll', scroll);
	embla.on('resize', resize);
	embla.on('pointerUp', pointerUp);
	embla.on('pointerDown', pointerDown);

	return {
		destroy: () => {
			embla.destroy();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			options?.store?.set(undefined);
		}
	};
};

export default action;
