import * as R from "ramda";

const MSGS = {
	NEW_CARD: 'NEW_CARD',
	QUESTION_INPUT: 'QUESTION_INPUT',
	ANSWER_INPUT: 'ANSWER_INPUT',
	SAVE: 'SAVE',
	EDIT_CARD: 'EDIT_CARD',
	DELETE_CARD: 'DELETE_CARD',
	SHOW_ANSWER: 'SHOW_ANSWER',
	RESULT: 'RESULT',
}

export const newCardMsg = {
	type: MSGS.NEW_CARD,
};

export function saveMsg(id) {
	return {
		type: MSGS.SAVE,
		id,
	};
}

export function questionInputMsg(id, question) {
	return {
		type: MSGS.QUESTION_INPUT,
		question,
		id,
	};
}

export function answerInputMsg(id, answer) {
	return {
		type: MSGS.ANSWER_INPUT,
		answer,
		id,
	};
}

export function editCardMsg(id) {
	return {
		type: MSGS.EDIT_CARD,
		id,
	};
}

export function deleteCardMsg(id) {
	return {
		type: MSGS.DELETE_CARD,
		id,
	};
}

export function showAnswerMsg(id) {
	return {
		type: MSGS.SHOW_ANSWER,
		id,
	};
}

export function resultMsg(id, result) {
  return {
    type: MSGS.RESULT,
    id,
    result,
  };
}

const updateCards = R.curry((updateCard, card) => {
	if (updateCard.id === card.id) {
		return { ...card, ...updateCard };
	}
	return card;
});

export const RESULTS = {
	INCORRECT: 0,
	GOOD: 1,
	CORRECT: 2,
}

function update(msg, model) {
	console.log(msg);

	switch(msg.type) {
		case MSGS.NEW_CARD: {
			const { nextId: id, cards } = model;
			const newCard = {
				id,
				question: '',
				answer: '',
				rank: 0,
				showAnswer: false,
				edit: true,
			};
		const updatedCards = R.prepend(newCard, cards);
		return { 
			...model, 
			cards: updatedCards, 
			nextId: id + 1 
		};
		}
		case MSGS.QUESTION_INPUT: {
			const { id, question } = msg;
			const { cards } = model;
			const updatedCards = R.map(updateCards({ id, question }), cards);
			return { ...model, cards: updatedCards };
		}
		case MSGS.ANSWER_INPUT: {
			const { id, answer } = msg;
			const { cards } = model;
			const updatedCards = R.map(updateCards({ id, answer }), cards);
			return { ...model, cards: updatedCards };
		}
		case MSGS.SAVE: {
			const { id } = msg;
			const { cards } = model;
			const updatedCards = R.map(updateCards({ id, edit: false }), cards);
			return { ...model, cards: updatedCards };
		}
		case MSGS.EDIT_CARD: {
			const { id } = msg;
			const { cards } = model;
			const updatedCards = R.map(updateCards({ id, edit: true }), cards);
			return { ...model, cards: updatedCards };
		}
		case MSGS.DELETE_CARD: {
			const { id } = msg;
			const { cards } = model;
			const updatedCards = R.filter(
				card => card.id !== id,
				cards
			);
			return { ...model, cards: updatedCards };
		}
		case MSGS.SHOW_ANSWER: {
			const { id } = msg;
			const { cards } = model;
			const updateCard = R.map(updateCards({ id, showAnswer: true }), cards);
			return { ...model, cards: updateCard };
		}
		case MSGS.RESULT: {
			const { id, result } = msg;
			const { cards } = model;
			const card = R.find(R.propEq('id', id), cards);

			const rank = R.cond([
				[R.propEq('result', RESULTS.INCORRECT), R.always(0)],
				[R.propEq('result', RESULTS.GOOD), ({ rank }) => rank + 1],
				[R.propEq('result', RESULTS.CORRECT), ({ rank }) => rank + 2],
			])({ result, rank: card.rank });

			const updatedCards = R.pipe(
        R.map(updateCards({ id, showAnswer: false, rank })),
        R.sortWith([
          R.ascend(R.prop('rank')), 
          R.descend(R.prop('id'))]
        )
      )(cards);
      return { ...model, cards: updatedCards };
		}
	}
	return model;
}

export default update;