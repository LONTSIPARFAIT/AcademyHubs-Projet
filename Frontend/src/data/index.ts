// src/data/index.ts
export * from './mockCourses';
export * from './mockCategories';
export * from './mockStats';

// Importez d'abord les variables
import { mockCourses } from './mockCourses';
import { mockCategories } from './mockCategories';
import { mockEnrolledStats, mockPlatformStats, mockSortOptions } from './mockStats';
import { categoryOptions, levelOptions, durationOptions } from './mockCategories';

// Puis exportez l'objet mockData
const mockData = {
  courses: mockCourses,
  categories: mockCategories,
  stats: mockEnrolledStats,
  platformStats: mockPlatformStats,
  sortOptions: mockSortOptions,
  categoryOptions,
  levelOptions,
  durationOptions
};

export default mockData;