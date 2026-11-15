export interface TeamMember {
  id: number;
  name: string;
  initials: string;
  photoUrl?: string;
  designation: string;
  qualifications: string[];
  description: string;
  department: 'Leadership' | 'Technical & Design' | 'Finance & Advisory';
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Architect Muyiwa Ige, FNIA',
    initials: 'MI',
    photoUrl: '/assets/managing-partner.jpg',
    designation: 'Managing Partner',
    qualifications: [
      'B.Arch (Hons).',
      'M.Arch, Illinois Institute of Technology, USA.',
    ],
    description:
      'Architect Muyiwa Ige is the Managing Partner of the firm. His expertise and experience cover the design and development of projects in both the USA and Nigeria, with over seventeen years of experience in the architecture and development industry.',
    department: 'Leadership',
  },
  {
    id: 2,
    name: 'Oyinda Ige',
    initials: 'OI',
    photoUrl: '/assets/director-oi.jpg?v=2',
    designation: 'Director – Environmental and Development Adviser',
    qualifications: [
      'LLB (Hons), Lagos.',
      'LLM, Buckingham, UK.',
    ],
    description:
      'Oyinda Ige is a lawyer with extensive experience in Corporate and Real Estate Law, Oil and Gas, and Environmental Law. She also lectures on Oil and Gas and Environmental Law at the University of Ibadan, Nigeria.',
    department: 'Leadership',
  },
  {
    id: 3,
    name: 'Lucas Omosebi',
    initials: 'LO',
    photoUrl: '/assets/team-lucas-omosebi.jpg',
    designation: 'Auditor / Accountant',
    qualifications: [
      'B.Sc (Hons), University of Calabar.',
      'ACA.',
      'ACTI.',
    ],
    description:
      'Lucas Omosebi is an experienced accountant specialising in monitoring and management of effective internal control systems, preparation of financial statements and auditing.',
    department: 'Finance & Advisory',
  },
  {
    id: 4,
    name: 'Folorunsho Olaniyan',
    initials: 'FO',
    designation: 'Quantity Surveyor',
    qualifications: [
      'B.Tech, Federal University of Technology, Akure.',
      'M.Sc, OAU.',
      'Quantity Surveying.',
      'In view: MMPA, ANIQS.',
    ],
    description:
      'Folorunsho Olaniyan is an experienced Quantity Surveyor specialising in preparation of Bills of Quantities, post-contract valuation, project monitoring and feasibility studies.',
    department: 'Technical & Design',
  },
  {
    id: 5,
    name: 'Prosper Popoola',
    initials: 'PP',
    designation: 'Project Manager / CADD Technician',
    qualifications: ['HND (Architecture), Ibadan.'],
    description:
      'Prosper Popoola is a Project Architect and Manager with experience in Construction Management and Design.',
    department: 'Technical & Design',
  },
  {
    id: 6,
    name: 'Gbenga Olaifa',
    initials: 'GO',
    designation: 'Project Manager',
    qualifications: ['HND (Building Technology), OSCOTECH, Esa-Oke.'],
    description:
      'Gbenga Olaifa is a Project Manager with experience in Construction Management and in actualising projected results.',
    department: 'Technical & Design',
  },
  {
    id: 7,
    name: 'Owojori Wunmi',
    initials: 'OW',
    designation: 'Architect / CADD Technician',
    qualifications: ['HND (Architecture), Esa-Oke.'],
    description:
      'Owojori Wunmi is a CADD Technician with extensive experience in Design and Site Development.',
    department: 'Technical & Design',
  },
  {
    id: 8,
    name: 'Blessing Onaolapo',
    initials: 'BO',
    designation: 'Accounts Officer',
    qualifications: ['ACA certification.'],
    description:
      'Blessing Onaolapo is the Accounts Officer, with extensive experience in accounting and ACA certification.',
    department: 'Finance & Advisory',
  },
  {
    id: 9,
    name: 'Taiwo Hassan Ogundimu',
    initials: 'TO',
    designation: 'ICT and Technology Specialist',
    qualifications: [
      'Diploma in Hardware Maintenance, University of Ibadan Computing Centre.',
      "Bachelor's Degree in IT Security, Swiss Management Center (SMC) University, Switzerland.",
    ],
    description:
      "Taiwo Ogundimu has extensive experience in computer hardware and software technology and the operation of various software applications such as AutoCAD, CorelDRAW, Microsoft Office, Microsoft Project and graphic design packages. He is also the firm's technical expert on ICT hardware and software-related issues.",
    department: 'Technical & Design',
  },
  {
    id: 10,
    name: 'Kehinde Olatunbosun Alatise',
    initials: 'KA',
    designation: 'Project Manager / CADD Technician',
    qualifications: ['HND (Architecture), Federal Polytechnic, Ado-Ekiti.'],
    description:
      'Alatise Kehinde is a Project Architect and Manager with experience in Construction Management and Design.',
    department: 'Technical & Design',
  },
  {
    id: 11,
    name: 'Ogundele Yusuff Olalekan',
    initials: 'OO',
    designation: 'Project Manager / CADD Technician',
    qualifications: ['OND (Architecture), Federal Polytechnic, Ado-Ekiti.'],
    description:
      'Lekan Ogundele is a Project Assistant Architect with experience in Construction Management and Design.',
    department: 'Technical & Design',
  },
  {
    id: 12,
    name: 'David Dahunsi',
    initials: 'DD',
    designation: 'Architect / CADD Technician',
    qualifications: ['OND (Architecture), Ibadan.'],
    description:
      'David Dahunsi is a CADD Technician with extensive experience in Design and Site Development.',
    department: 'Technical & Design',
  },
];
