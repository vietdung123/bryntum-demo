export const departmentsInitialState = {
	departments: [] as IDepartment[],
};

export interface IDepartment {
	export_code: string;
	id: number;
	location_id: number;
	location_name: string;
	name: string;
}

export interface IChildren {
	id: number;
	name: string;
	title: string;
	value: string;
	key: string;
}
