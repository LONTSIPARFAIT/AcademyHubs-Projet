// Exportation de toutes les données mock
export * from './mockCourses';
export * from './mockCategories';
export * from './mockStats';

// Vous pouvez aussi créer un objet unique pour tout exporter
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