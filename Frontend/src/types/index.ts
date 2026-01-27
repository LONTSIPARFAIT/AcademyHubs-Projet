export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  img: string;
  chapters?: any[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}