import { UserType } from "./UserType"

export class User {
    id: string
    firstName: string
    lastName: string
    email: string
    dateofBirth: string
    grade: string
    location: string
    phoneNumber: string
    organizationName: string
    userType: UserType;
    expYearofGrad: string;
    receiveUpdates: boolean
    parentsEmail: string;

    constructor() {}
    
    /* constructor(id: number, firstName: String, lastName: String, email: String, dateofBirth: string, grade: String, location: String, phoneNumber: String, organizationName: String, userType: UserType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateofBirth = dateofBirth;
        this.grade = grade;
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.organizationName = organizationName;
        this.userType = userType;
    } */
}
