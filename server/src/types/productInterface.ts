import { ObjectId } from "mongoose";
export interface ProductInterface {
    productName: string,
    description: string;
    age: Number;
    condition: string;
    rarity: string;
    image: string,
    userId: string | ObjectId;

}

export interface EditProductInterface {
    productName: string;
    description: string;
    age: Number;
    condition: string;
    rarity: string
}

export interface Report {
    _id: string;
    subject: string;
    issue: string;
    createdOn: string;
    reportedUser: string;
    ReportedPost: string;
    __v: number;
  }
  
 export interface GroupedReport {
    _id: string;
    subject: string;
    issue: string;
    createdOn: string;
    reportedUser: string;
    ReportedPost: string;
    __v: number;
    count: number;
  }

