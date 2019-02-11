import * as R from "ramda";

const MSGS = {
	NEW_CARD: 'NEW_CARD',
	SAVE: 'SAVE',
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
                        // pierwsz arg to obiekt
const updateCards = R.curry((updateCard, card) => {
	if(updateCard.id === card.id) {
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
		case MSGS.SAVE: {
			const { id } = msg;
			const { cards } = model;
			const updatedCards = R.map(updateCards({ id, edit: false }), cards);
			return { ...model, cards: updatedCards };
		}
	}
	return model;
}

export default update;