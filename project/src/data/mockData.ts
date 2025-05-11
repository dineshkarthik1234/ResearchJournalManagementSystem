import { User, Paper, Review, Revision } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'author',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    institution: 'University of Science',
    bio: 'Researcher in molecular biology with 15+ publications'
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    email: 'michael.johnson@university.edu',
    role: 'editor',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    institution: 'Global Science Institute',
    bio: 'Editor-in-chief with expertise in computational biology'
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@university.edu',
    role: 'reviewer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    institution: 'Tech University',
    bio: 'Assistant Professor specializing in bioinformatics'
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    email: 'robert.williams@university.edu',
    role: 'author',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    institution: 'Medical Research Center',
    bio: 'Specializing in cancer research and immunotherapy'
  }
];

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Novel Approaches to Gene Editing Using CRISPR-Cas9',
    abstract: 'This paper presents innovative methods for precise gene editing using the CRISPR-Cas9 system, with applications in treating genetic disorders.',
    authors: ['1'],
    keywords: ['CRISPR', 'Gene Editing', 'Genetic Disorders'],
    status: 'published',
    submittedAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-03-10'),
    publishedAt: new Date('2023-04-05'),
    fileUrl: '/papers/gene-editing.pdf',
    version: 2,
    editorId: '2'
  },
  {
    id: '2',
    title: 'Machine Learning Applications in Climate Prediction Models',
    abstract: 'We explore how machine learning algorithms can improve the accuracy of climate prediction models by analyzing historical weather data patterns.',
    authors: ['4'],
    keywords: ['Machine Learning', 'Climate Science', 'Prediction Models'],
    status: 'under-review',
    submittedAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-20'),
    version: 1,
    editorId: '2'
  },
  {
    id: '3',
    title: 'Quantum Computing: Breaking RSA Encryption',
    abstract: 'This theoretical paper discusses the implications of quantum computing advancements on current RSA encryption standards and potential vulnerability mitigation strategies.',
    authors: ['1'],
    keywords: ['Quantum Computing', 'Cryptography', 'Security'],
    status: 'revision-requested',
    submittedAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-06-15'),
    version: 1,
    editorId: '2'
  },
  {
    id: '4',
    title: 'Effects of Intermittent Fasting on Metabolic Health',
    abstract: 'A systematic review of clinical studies examining the impact of various intermittent fasting protocols on metabolic health markers.',
    authors: ['4'],
    keywords: ['Intermittent Fasting', 'Metabolism', 'Clinical Nutrition'],
    status: 'draft',
    updatedAt: new Date('2023-07-01'),
    version: 1
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    paperId: '1',
    reviewerId: '3',
    comments: 'This paper presents a significant advancement in CRISPR technology. The methodology is sound and the results are promising. Some minor revisions to the discussion section would strengthen the paper.',
    score: 8,
    decision: 'accept',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-28'),
    isComplete: true
  },
  {
    id: '2',
    paperId: '2',
    reviewerId: '3',
    comments: 'The approach is interesting, but the validation methodology needs strengthening. Additional comparison with traditional models would be beneficial.',
    score: 6,
    decision: 'revise',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-10'),
    isComplete: true
  },
  {
    id: '3',
    paperId: '3',
    reviewerId: '3',
    comments: 'The theoretical framework is strong, but the paper would benefit from more concrete examples and potential real-world applications.',
    score: 7,
    decision: 'revise',
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-05-20'),
    isComplete: true
  }
];

export const mockRevisions: Revision[] = [
  {
    id: '1',
    paperId: '1',
    version: 2,
    changes: 'Expanded the discussion section to address the limitations and future directions. Added two new figures demonstrating the efficacy of the proposed method.',
    fileUrl: '/papers/gene-editing-v2.pdf',
    submittedAt: new Date('2023-03-10')
  }
];