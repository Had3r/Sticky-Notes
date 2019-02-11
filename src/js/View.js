import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

const { pre, div, h1, h2, button, span, textarea, a, i } = hh(h);

function remove(dispatch, card) {
	return i({
		className: 'far fa-trash-alt'
	});
}

function btn(dispatch, card) {
	const { showAnswer } = card;
	return showAnswer
		? div({
				className: 'buttonSet'
			},
			[
				button(
					{ className: 'secondary-btn' }, 
						i({ className: 'far fa-frown'})),
				button(
					{ className: 'secondary-btn' },
						i({ className: 'far fa-meh'})),
				button(
					{ className: 'secondary-btn' },
						i({ className: 'far fa-smile'})),
			]
			)
		: null;
}

function answer(dispatch, card) {
	const { showAnswer } = card;
	return showAnswer
		? div([
				h2({ className: 'sec-header' }, 'Odpowiedź'),
				div({ className: 'text'},
				card.answer,
				),
		])
		: h2([
				a(
					{
						className: 'sec-header'
					},
					'Pokaż odpowiedź'
				)
		]);
}

function question(dispatch, card) {
	return div({ className: ''}), [
		h2({ className: 'sec-header'}, 'Pytanie'),
		div({ className: 'text'},
		card.question,
		),
	];
}

function viewCard(dispatch, card) {
	return div(
		{
			className: 'card'
		},
		[
			question(dispatch, card),
			answer(dispatch, card),
			btn(dispatch, card),
			remove(dispatch, card)
		],
	);
}

const card = R.curry((dispatch, card) => {
	const { edit } = card;
	return edit ? editCard(dispatch, card) : viewCard(dispatch, card);
});

function view(dispatch, model) {
	const cards = R.map(
		card(dispatch),
		model.cards
	);
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
			span('Dodaj pytanie'),
		),
		div({ className: 'cards' }, cards),
		//pre({ className: 'test'}, JSON.stringify(model, null, 3))
	])
}


export default view;