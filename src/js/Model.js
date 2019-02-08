const initModel = {
	nextId: 3,
	cards: [
		{
			id: 2,
			question: 'Czym jest spread operator?',
			answer: 'Operator ten rozbija powatarzalne dane (jak tablice, ciągli znaków) na pojedyńcze elementy.',
			rank: 0,
			showAnswer: false,
			edit: false,
		},
		{
			id: 1,
			question: 'Czym jest rest parameters?',
			answer: 'Pozwala nam przekazać dowolną ilość argumentów do funkcji i użyć te argumenty w funkcji. Uzyskuje pojedyńcze wartości i przekształca w talice',
			rank: 0,
			showAnswer: false,
			edit: false,
		},
		{
			id: 0,
			question: 'Czym jest obietnica?',
			answer: 'Obietnica to obiekt, który sprawdza, czy pewne wydarzenie już się stało, czy nie. Jeśli się zdarzyło, wtedy obietnica określa, co stanie się później.',
			rank: 0,
			showAnswer: false,
			edit: false,
		},
	],
};

export default initModel;