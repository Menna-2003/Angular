export interface IUser {
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string[];
    address: {
        city: string;
        postalCode: string;
        street: string;
    }
}
