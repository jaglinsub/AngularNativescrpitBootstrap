import { UserType } from "./UserType"

export class User {
    id: number
    firstName: String
    lastName: String
    email: String
    dateofBirth: string
    grade: String
    location: String
    phoneNumber: String
    organizationName: String
    userType: UserType;

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