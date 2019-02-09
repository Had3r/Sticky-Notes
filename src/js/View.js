import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre, div, h1, button, span } = hh(h);

function view(msg, model) {
	return div({ className: 'wrapper' }, [
		h1(
			{
				className: 'heading',
			},
			'Sticky Notes'
		),
		button(
			{
				className: 'btn'
			},
			span('Add Questions'),
		),
		pre(JSON.stringify(model, null, 3))
	])
}


export default view;