import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

const { pre, div, h1, button, span, textarea, a, i } = hh(h);

function btn(dispatch, card) {
	const { showAnswer } = card;
	return showAnswer
		? div({
				className: 'buttonSet'
			},
			[
				button(
					{ className: 'button' }, 
						i({ className: 'far fa-smile'})),
				button(
					{ className: 'button' },
						i({ className: 'far fa-meh'})),
				button(
					{ className: 'button' },
						i({ className: 'far fa-smile'})),
			]
			)
		: null;
}

function answer(dispatch, card) {
	const { showAnswer } = card;
	return showAnswer
		? div([
				div({ className: '' }, 'Answer'),
				div({ className: ''},
				card.answer,
				),
		])
		: div([
				a(
					{
						className: ''
					},
					'Show Answer'
				)
		])
}

function question(dispatch, card) {
	return div({ className: ''}), [
		div({ className: 'question'}, 'Question'),
		div({
			className: 'text',
			value: card.question,
		})
	]
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
			span('Add Questions'),
		),
		div({ className: 'cards' }, cards),
		pre({ className: 'test'}, JSON.stringify(model, null, 3))
	])
}


export default view;