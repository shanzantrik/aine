export interface Course {
  id: string
  name: string
  duration: string
  seats: number
  eligibility: string[]
  description: string
  applicationFee: number
  requiredDocuments: string[]
  selectionProcess: string[]
  ageLimit?: string
  experienceRequired?: string
  specialties?: string[]
}

export const courses: Course[] = [
  {
    id: 'bsc-nursing',
    name: 'B.Sc. Nursing Programme',
    duration: '4 years',
    seats: 100,
    eligibility: [
      'Completion of 16 yrs of age at the time of admission',
      'Minimum 50% in Higher Secondary in Science group: Physics, Biology and Chemistry (PBC) with English',
      'Minimum 45% & above in PBC with English for SC/ST/OBC/DT-NT',
      'Only unmarried girl candidate are eligible for admission',
      'Medical certificate stating optimum health status'
    ],
    description: 'The Bachelor of Science (Nursing) is an undergraduate degree programme of 4 years duration leading to degree of Science in Nursing. It is expected that each graduate maintain a high quality of work in all aspects of Nursing.',
    applicationFee: 1000,
    requiredDocuments: [
      'H.S.C. Passing Certificate',
      'H.S.C. Mark Sheet',
      'School Leaving Certificate',
      'Migration certificate from University/Board',
      'Community certificate belonging to scheduled Tribe/Schedules Caste/Backward class',
      'Medical certificate stating optimum health status',
      'Certificate stating of good conduct from the principal of the college/school'
    ],
    selectionProcess: [
      'Written test includes papers in English, Science, Arithmetic and General Knowledge',
      'Personal interview',
      'Test will be held in the Institute'
    ],
    ageLimit: '16 years minimum'
  },
  {
    id: 'post-basic-bsc-nursing',
    name: 'Post Basic B.Sc. Nursing',
    duration: '2 years',
    seats: 25,
    eligibility: [
      'Passed the Higher Secondary or Senior Secondary or Intermediate or 10+2 or an equivalent examination recognized by the university',
      'Obtained a certificate in diploma General Nursing and Midwifery with Minimum 45% & above',
      'Registered as R.N, R.M. with the State Nurses Registration Council',
      'Candidates shall be medically fit',
      'Candidate should be within 45 years of age on 31st January of the year of admission'
    ],
    description: 'The Post Basic Bachelor of Science (nursing) is an undergraduate degree programme leading to degree of Science in Nursing.',
    applicationFee: 1000,
    requiredDocuments: [
      'Copy of B.Sc. Nursing Certificate signed by the principal',
      'B.Sc. Nursing Mark Sheet',
      'H.S.C. Passing Certificate',
      'H.S.C. Mark Sheet',
      'School Leaving Certificate',
      'Community certificate belonging to scheduled Tribe/Schedules Caste/Backward class'
    ],
    selectionProcess: [
      'Personal interview',
      'Marks obtained in the GNM examination'
    ],
    ageLimit: '45 years maximum'
  },
  {
    id: 'msc-nursing',
    name: 'M.Sc. Nursing Programme',
    duration: '2 years',
    seats: 0, // Not specified in the provided data
    eligibility: [
      'Only women candidates are eligible to apply',
      'Passed B.Sc.Nursing (Basic) or Post Basic B.Sc.Nursing degree',
      'Minimum of one years of experience after obtaining B.Sc. Nursing (Basic)',
      'Registered in State Nursing Council as a Registered Nurse and Registered Midwife',
      'Candidates in service should apply through proper channel'
    ],
    description: 'Modern nursing is a dynamic, therapeutic and educative process in meeting the health needs of individuals, the family and the community.',
    applicationFee: 1000,
    requiredDocuments: [
      'B.Sc(N) Degree or Pc. B.Sc(N) degree',
      'Marksheet of the B .Sc(N) Degree or Pc. B.Sc(N) degree exam',
      'Migration certificate from the University'
    ],
    selectionProcess: [
      'Personal interview',
      'Candidate must bring all original certificates, mark sheets and necessary relevant document on the day of interview'
    ],
    specialties: [
      'Medical –Surgical Nursing',
      'Community Health Nursing',
      'Obstetrics and Gynecological Nursing',
      'Child Health Nursing'
    ],
    experienceRequired: '1 year after B.Sc. Nursing'
  },
  {
    id: 'gnm',
    name: 'GNM (General Nursing and Midwifery)',
    duration: '3 years',
    seats: 0, // Not specified in the provided data
    eligibility: [
      '10+2 with English and must have obtained a minimum of 40% at the qualifying examination',
      '10+2 with English having 40% of marks in vocational ANM course from the school recognized by Indian Nursing Council',
      '10+2 with English having 40% of marks in Vocational Stream-Health care Science from a recognized CBSE board/Centre',
      'Registered as ANM with State Nursing Registration Council',
      'Student shall be medically fit',
      'Students qualified in 10+2 Arts/Science examination or Health care Science - Vocational stream only conducted by National Institute of Open School with 40% marks'
    ],
    description: 'General Nursing and Midwifery program preparing students for comprehensive nursing care and midwifery practice.',
    applicationFee: 1000,
    requiredDocuments: [
      'H.S.L.C., HS Marksheet & Pass Certificate',
      'Migration certificate from University/Board',
      '2 passport coloured Size Photo',
      'Medical Fitness Certificate',
      'Original Character Certificate',
      'Original Transfer Certificate'
    ],
    selectionProcess: [
      'Merit based on qualifying examination',
      'Personal interview'
    ]
  },
  {
    id: 'nurse-practitioner-critical-care',
    name: 'Nurse Practitioner in Critical Care',
    duration: '2 years (Residential)',
    seats: 10,
    eligibility: [
      'Applicants must possess a registered B.Sc. nurse with a minimum of one year clinical experience',
      'Preferably in any critical care setting prior to enrollment',
      'Must have undergone the BSC in an institution recognized by the Indian Nursing Council',
      'Must have scored not less than 55% aggregate marks in the BSc program',
      'Be physically fit'
    ],
    description: 'The critical care NP program prepares registered BSc nurses for advanced practice roles as clinical experts, managers, educators and consultants leading to M.Sc degree in critical care NP.',
    applicationFee: 1000,
    requiredDocuments: [
      'H.S.L.C., HS Marksheet & Pass Certificate',
      'BSc.(N) Degree or Post Basic Degree Marksheet and Pass Certificate',
      'Migration certificate from University/Board/Council',
      '2 passport coloured Size Photo',
      'Photocopy of Registration in Parent Council(RN, RM)',
      'Medical Fitness Certificate',
      'Photocopy of Experience Certificate',
      'Original Character Certificate',
      'Original Transfer Certificate'
    ],
    selectionProcess: [
      'Entrance examination',
      'Viva test'
    ],
    experienceRequired: '1 year clinical experience in critical care setting'
  }
]

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id)
}

export const getCoursesByEligibility = (qualification: string, marks: number): Course[] => {
  return courses.filter(course => {
    // Basic filtering based on qualification and marks
    if (qualification === '10+2' && marks >= 50) {
      return ['bsc-nursing', 'gnm'].includes(course.id)
    }
    if (qualification === 'GNM' && marks >= 45) {
      return ['post-basic-bsc-nursing'].includes(course.id)
    }
    if (qualification === 'B.Sc. Nursing' && marks >= 55) {
      return ['msc-nursing', 'nurse-practitioner-critical-care'].includes(course.id)
    }
    return false
  })
}
