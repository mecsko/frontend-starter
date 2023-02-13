interface IMany {
	id: number; // PK
	categoryId: number; // FK
	titleField: string;
	descField: string;
	dateField: string;
	boolField: boolean;
	priceField: number;
	imgField: string;
	category?: {
		id: number;
		categoryNameField: string;
	};
}

export { IMany };
