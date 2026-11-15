export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

import commercialImg from '../assets/images/commercial_institutional_architecture_1794682083345.jpg';
import residentialImg from '../assets/images/residential_interior_architecture_1794682084505.jpg';
import planningImg from '../assets/images/architectural_planning_studio_1794682084858.jpg';

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Architecture and Building Design',
    summary:
      'Comprehensive architectural design services spanning initial concept formulation through detailed working drawings for residential, commercial, healthcare, and institutional buildings.',
    deliverables: [
      'Conceptual architectural designs',
      'Preliminary designs and prototype schemes',
      'Final architectural designs',
      'Working drawings',
      'Residential and commercial architecture',
    ],
    image: '/assets/service-architecture-01.png',
    imageAlt: 'Architecture and Building Design project visual by Leo Biga Associates Limited',
  },
  {
    number: '02',
    title: 'Development Planning',
    summary:
      'Strategic site evaluation, masterplanning, and phased implementation strategies structured to align land potential with investor and institutional goals.',
    deliverables: [
      'Identification of sites for development',
      'Project planning',
      'Development strategies',
      'Implementation planning',
    ],
    image: planningImg,
    imageAlt: 'Architectural drafting table with urban site masterplan and timber scale model',
  },
  {
    number: '03',
    title: 'Interior Design',
    summary:
      'Coordinated interior architecture focused on spatial efficiency, enduring materials, functional ergonomics, and executive aesthetic quality.',
    deliverables: [
      'Interior space planning',
      'Functional and aesthetic design',
      'Interior development and coordination',
    ],
    image: '/assets/service-interior-03.jpg',
    imageAlt: 'Interior Design space planning and aesthetic finish by Leo Biga Associates Limited',
  },
  {
    number: '04',
    title: 'Environmental Design and Planning',
    summary:
      'Site-responsive environmental design, regulatory impact evaluation, and advisory services supporting sustainable built environments.',
    deliverables: [
      'Environmental design',
      'Environmental Impact Assessment (EIA)',
      'Environmental planning and advisory services',
    ],
    image: '/assets/service-environmental-04.png',
    imageAlt: 'Environmental Design and Planning masterplan visual by Leo Biga Associates Limited',
  },
  {
    number: '05',
    title: 'Project Management',
    summary:
      'Disciplined project delivery oversight from tender documentation and contractor selection through on-site monitoring and final completion.',
    deliverables: [
      'Project coordination',
      'Tender action',
      'Construction monitoring',
      'Project management from tender action to completion',
    ],
    image: planningImg,
    imageAlt: 'Project scheduling blueprints and architectural scale model in studio',
  },
  {
    number: '06',
    title: 'Facilities Management',
    summary:
      'Structured operational stewardship and lifecycle property management protecting asset performance, safety, and long-term capital value.',
    deliverables: [
      'Facilities management services',
      'Building and property management',
      'Operational planning and support',
    ],
    image: commercialImg,
    imageAlt: 'Modern institutional and corporate headquarters exterior',
  },
  {
    number: '07',
    title: 'Construction Services',
    summary:
      'Integrated construction execution and site management ensuring architectural intent is realised on schedule and within disciplined cost parameters.',
    deliverables: [
      'General construction',
      'Construction management',
      'Development implementation',
    ],
    image: '/assets/service-construction-07.jpg',
    imageAlt: 'Construction Services execution and site management by Leo Biga Associates Limited',
  },
  {
    number: '08',
    title: 'Feasibility Studies and Advisory Services',
    summary:
      'Technical and financial development appraisals, project structuring advisory, and funding support for public, corporate, and private sponsors.',
    deliverables: [
      'Development feasibility studies',
      'Project advisory services',
      'Project financing and development support',
    ],
    image: residentialImg,
    imageAlt: 'Contemporary architectural interior and courtyard vista',
  },
];
