interface CourseFiltersProps {
  // ... autres props
  categories: string[];
  levels: string[];
  durations: string[];
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  // ... autres props
  categories,
  levels,
  durations
}) => {
  // Utiliser les props au lieu des valeurs statiques
  return (
    // ... JSX utilisant categories, levels, durations
  );
};