export enum DomainErrorType {
	NotFound,
	ValidationError,
	InternalError,
	DuplicateError,
}

export interface DomainError {
	type: DomainErrorType;
	message: string;
}
