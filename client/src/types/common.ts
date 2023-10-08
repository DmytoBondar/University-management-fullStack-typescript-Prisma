export interface IMeta {
    limit: number;
    page: number;
    total: number;
}

export interface ISuccessResponseType {
    data: any;
    meta?: IMeta;
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export interface IDepartment {
    id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
export interface IAdmin {
    id: string;
    name: string;
    gender: string;
    managementDepartment: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}