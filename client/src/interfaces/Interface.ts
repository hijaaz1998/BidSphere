export interface AuctionDetails {
    _id: string;
    createdOn: Date;
    currentAmount: number;
    currentBidder: {
        firstName: string;
        lastName: string
    };
    endingDate: Date;
    isActive: boolean;
    isBlocked: boolean;
    isCompleted: boolean;
    isPaid: boolean;
    isRemoved: boolean;
    participants: string[];
    postId: {
        _id: string;
        description: string;
        image: string;
        productName: string;
        userId: {
            firstName: string;
            lastName: string;
            _id: string;
        };
        startingAmount: number;
        startingDate: Date;
        __v: number;
    };
    winner: string;
    __v: number;
}

export interface Product {
    _id: string;
    age: number;
    comments: any[];
    condition: string;
    createdOn: Date;
    description: string;
    favorited: boolean;
    image: string;
    isAuctioned: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    isSold: boolean;
    likes: { user: string; _id: string }[];
    productName: string;
    rarity: string;
    reportCount: number;
    userId: {
        email: string;
        firstName: string;
        lastName: string;
        _id: string;
    };
    __v: number;
}

export interface ReportedPost {
    ReportedPost: {
        _id: string;
        age: number;
        comments: any[];
        condition: string;
        createdAt: Date;
        description: string;
        favorited: boolean;
        image: string;
        isAuctioned: boolean;
        isBlocked: boolean;
        isDeleted: boolean;
        isSold: boolean;
        likes: { user: string; _id: string }[];
        productName: string;
        rarity: string;
        reportCount: number;
        userId: {
            _id: string;
            createdAt: Date;
            email: string;
            firstName: string;
            followers: string[];
            following: string[];
            isBlocked: boolean;
            jti: string;
            lastName: string;
            updatedAt: Date;
            __v: number;
        };
    };
    createdOn: Date;
    issue: string;
    reportedUser: {
        _id: string;
        createdAt: Date;
        email: string;
        firstName: string;
        followers: string[];
        following: string[];
        isBlocked: boolean;
        jti: string;
        lastName: string;
        updatedAt: Date;
        __v: number;
    };
    subject: string;
    __v: number;
    _id: string
}

export interface User {
    _id: string;
    createdAt: Date;
    email: string;
    firstName: string;
    followers: string[];
    following: string[];
    image: string;
    isBlocked: boolean;
    jti: string;
    lastName: string;
    password: string;
    updatedAt: Date;
    __v: number;
}

export interface Post {
    _id: string;
    age: number;
    comments: {
      comment: string;
      createdOn: Date;
      user: string;
      _id: string;
    }[];
    condition: string;
    createdOn: Date;
    description: string;
    favorited: boolean;
    image: string;
    isAuctioned: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    isSold: boolean;
    likes: {
      user: string;
      _id: string;
    }[];
    productName: string;
    rarity: string;
    reportCount: number;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
      image: string
    }[];
    __v: number;
  }
  
export interface AuctionListing {
    _id: string;
    createdOn: Date;
    currentAmount: number;
    endingDate: Date;
    isActive: boolean;
    isBlocked: boolean;
    isCompleted: boolean;
    isPaid: boolean;
    isRemoved: boolean;
    participants: string[];
    postId: {
      age: number;
      comments: any[];
      condition: string;
      createdOn: Date;
      description: string;
      favorited: boolean;
      image: string;
      isAuctioned: boolean;
      isBlocked: boolean;
      isDeleted: boolean;
      isSold: boolean;
      likes: any[];
      productName: string;
      rarity: string;
      reportCount: number;
      userId: {
        createdAt: Date;
        email: string;
        firstName: string;
        followers: string[];
        following: string[];
        image: string;
        isBlocked: boolean;
        jti: string;
        lastName: string;
        password: string;
        updatedAt: Date;
        __v: number;
        _id: string;
      };
      __v: number;
      _id: string;
    };
    startingAmount: number;
    startingDate: Date;
    winner: string;
    __v: number;
  }
  
export interface bidData {
    userId: string;
    firstName: string;
    lastName: string;
    amount: number
}

