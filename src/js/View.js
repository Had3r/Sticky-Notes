import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import { newCardMsg, questionInputMsg, answerInputMsg, saveMsg, editCardMsg, deleteCardMsg, showAnswerMsg } from './Update';

const { pre, div, h1, h2, button, span, textarea, a, i } = hh(h);

function remove(dispatch, card) {
	return i({
		className: 'far fa-trash-alt',
		onclick: () => dispatch(deleteCardMsg(card.id)),
	});
}

function changeMode(dispatch, card) {
	return i({
		className: 'far fa-edit',
		onclick: () => dispatch(editCardMsg(card.id)),
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
						className: 'sec-header answ',
						onclick: () => dispatch(showAnswerMsg(card.id)),
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
			remove(dispatch, card),
			changeMode(dispatch, card),
		],
	);
}

function editAnswer(dispatch, card) {
	return div({ className: ''}, [
		h2({ className: 'sec-header' }, 'Odpowiedź'),
		textarea({
			className: 'textarea',
			value: card.answer,
			oninput: e => dispatch(answerInputMsg(card.id, e.target.value)),
		})
	]);
}

function editQuestion(dispatch, card) {
	return div({ className: '' }, [
		h2({ className: 'sec-header' }, 'Pytanie'),
		textarea({
			className: 'textarea',
			value: card.question,
			oninput: e => dispatch(questionInputMsg(card.id, e.target.value)),
		}),
	]);
}


function editCard(dispatch, card) {
	return div(
		{
			className: 'card'
		},
		div(
			{
				className: ''
			},
			[
				editQuestion(dispatch, card),
				editAnswer(dispatch, card),
				button(
					{ 
						className: 'secondary-btn', 
						onclick: () => dispatch(saveMsg(card.id)),
				}, 
				i({ className: 'far fa-save'})),
				remove(dispatch, card),
			],
			
		)
	)
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
				className: 'btn',
				onclick: () => dispatch(newCardMsg),
			},
			span('Dodaj pytanie'),
		),
		div({ className: 'cards' }, cards),
		//pre({ className: 'test'}, JSON.stringify(model, null, 3))
	])
}


export default view;