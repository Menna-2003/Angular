export interface IUser {
    id: string;
    token: string;
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string[];
    address: {
        city: string;
        postalCode: string;
        country: string;
    }
    Role: string;
}
