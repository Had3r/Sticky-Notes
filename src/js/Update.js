import * as R from "ramda";

const MSGS = {
	NEW_CARD: 'NEW_CARD',
	QUESTION_INPUT: 'QUESTION_INPUT',
}

export const newCardMsg = {
	type: MSGS.NEW_CARD,
};



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
	}

	return model;
}


export default update;