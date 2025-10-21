
export type CollegeType = 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'School';

export const collegeList: Record<CollegeType, string[]> = {
  'IIT': [
    'Indian Institute of Technology Bombay',
    'Indian Institute of Technology Delhi',
    'Indian Institute of Technology Madras',
    'Indian Institute of Technology Kanpur',
    'Indian Institute of Technology Kharagpur',
    'Indian Institute of Technology Roorkee',
    'Indian Institute of Technology Guwahati',
  ],
  'NIT': [
    'National Institute of Technology Tiruchirappalli',
    'National Institute of Technology Warangal',
    'National Institute of Technology Surathkal',
    'National Institute of Technology Calicut',
    'National Institute of Technology Rourkela',
  ],
  'IIIT': [
    'Indian Institute of Information Technology Allahabad',
    'Indian Institute of Information Technology Hyderabad',
    'Indian Institute of Information Technology Bangalore',
    'Indian Institute of Information Technology Gwalior',
  ],
  'Private': [
    'Birla Institute of Technology and Science, Pilani',
    'Vellore Institute of Technology',
    'Manipal Institute of Technology',
    'Thapar Institute of Engineering and Technology',
  ],
  'School': [
    // This can be populated if needed for the school student portal
  ]
};

export const collegeTypes = Object.keys(collegeList) as CollegeType[];
