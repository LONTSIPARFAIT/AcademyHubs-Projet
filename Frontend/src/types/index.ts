export interface Course {
   id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    lessons: number;
    students: number;
    rating: number;
    instructor: string;
    price: number;
    discountedPrice: number;
    img: string;
    tags: string[];
    featured: boolean;
    new: boolean;
    progress: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}