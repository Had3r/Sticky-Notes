import * as R from "ramda";

const MSGS = {
	NEW_CARD: 'NEW_CARD',
	SAVE: 'SAVE',
	QUESTION_INPUT: 'QUESTION_INPUT',
	ANSWER_INPUT: 'ANSWER_INPUT',
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
	}
}

const updateCards = R.curry((updateCard, card) => {
	if (updateCard.id === card.id) {
		return { ...card, ...updateCard };
	}
	return card;
});

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
			const updatedCards = R.map(updateCards( { id, answer }), cards);
			return { ...model, cards: updatedCards };
		}
	}
	return model;
}

export default update;