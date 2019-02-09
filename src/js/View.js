import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre, div, h1, header, section } = hh(h);

function view(msg, model) {
	return div({ className: 'wrapper' }, [
		h1(
			{
				className: 'btn',
			}
		),
		pre(JSON.stringify(model, null, 3))
	])

}


export default view;