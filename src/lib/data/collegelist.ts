
export type CollegeType = 'IIT' | 'NIT' | 'IIIT' | 'Private';

export const iitList: string[] = [
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'IIT Kharagpur',
  'IIT Roorkee',
  'IIT Guwahati',
];

export const nitList: string[] = [
  'NIT Tiruchirappalli',
  'NIT Warangal',
  'NIT Surathkal',
  'NIT Calicut',
  'NIT Rourkela',
];

export const iiitList: string[] = [
  'IIIT Allahabad',
  'IIIT Hyderabad',
  'IIIT Bangalore',
  'IIIT Gwalior',
];

export const privateList: string[] = [
  'BITS Pilani',
  'VIT Vellore',
  'Manipal Institute of Technology',
  'Thapar Institute of Engineering and Technology',
];

export const collegeTypes: CollegeType[] = ['IIT', 'NIT', 'IIIT', 'Private'];

export const collegeList: Record<CollegeType, string[]> = {
  'IIT': iitList,
  'NIT': nitList,
  'IIIT': iiitList,
  'Private': privateList,
};
