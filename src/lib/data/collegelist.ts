
export type CollegeType = 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'School';

export const collegeList: Record<CollegeType, string[]> = {
  'IIT': [
    'IIT Bombay',
    'IIT Delhi',
    'IIT Madras',
    'IIT Kanpur',
    'IIT Kharagpur',
    'IIT Roorkee',
    'IIT Guwahati',
  ],
  'NIT': [
    'NIT Tiruchirappalli',
    'NIT Warangal',
    'NIT Surathkal',
    'NIT Calicut',
    'NIT Rourkela',
  ],
  'IIIT': [
    'IIIT Allahabad',
    'IIIT Hyderabad',
    'IIIT Bangalore',
    'IIIT Gwalior',
  ],
  'Private': [
    'BITS Pilani',
    'VIT Vellore',
    'Manipal Institute of Technology',
    'Thapar Institute of Engineering and Technology',
  ],
  'School': [
    // This can be populated if needed for the school student portal
  ]
};

export const collegeTypes = Object.keys(collegeList) as CollegeType[];
