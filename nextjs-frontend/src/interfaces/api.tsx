export type ObjectType = Record<string, string | number | boolean | Date>;

export type RequestType = {
	url: string;
	headers?: ObjectType;
	token?: string;
	body?: ObjectType | FormData;
	params?: ObjectType;
};
