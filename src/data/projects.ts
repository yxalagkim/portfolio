export interface ProjectItem {
  id: string;
  title: string;
  link: string;
  meta: string;
  year: string;
  tags: string[];
  thumbnailType: 'video' | 'image';
  thumbnailSrc: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'espoir',
    title: 'Espoir',
    link: 'https://yxalagkim.github.io/espoir/',
    meta: 'Project',
    year: '2026',
    tags: ['#E-commerce', '#Renewal'],
    thumbnailType: 'video',
    thumbnailSrc: '/video/espoir.mp4',
  },
  {
    id: 'daejeon',
    title: '대전시청',
    link: 'https://yxalagkim.github.io/daejeon/',
    meta: 'Project',
    year: '2025',
    tags: ['#WebAccessibility', '#Clone'],
    thumbnailType: 'video',
    thumbnailSrc: '/video/daejeon.mp4',
  },
  {
    id: 'i815',
    title: '독립기념관',
    link: 'https://yxalagkim.github.io/i815/',
    meta: 'Work',
    year: '2024',
    tags: ['#WebAccessibility', '#Renewal'],
    thumbnailType: 'image',
    thumbnailSrc: '/images/i815.jpg',
  },
  {
    id: 'susan',
    title: '수산교육포털',
    link: 'https://yxalagkim.github.io/susan/web/main/',
    meta: 'Work',
    year: '2024',
    tags: ['#WebAccessibility', '#Renewal'],
    thumbnailType: 'image',
    thumbnailSrc: '/images/susan.jpg',
  },
];
