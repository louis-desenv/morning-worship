
import { Video } from '../types';

const mockVideos: Video[] = [
  {
    id: 'mw1',
    title: 'Maintain Your Joy Despite Trials',
    speaker: 'Anthony Morris III',
    thumbnailUrl: 'https://picsum.photos/seed/mw1/600/400',
  },
  {
    id: 'mw2',
    title: '“The Wise Listen to Counsel”',
    speaker: 'Geoffrey Jackson',
    thumbnailUrl: 'https://picsum.photos/seed/mw2/600/400',
  },
  {
    id: 'mw3',
    title: 'Do Not Look at the Things Behind',
    speaker: 'Stephen Lett',
    thumbnailUrl: 'https://picsum.photos/seed/mw3/600/400',
  },
  {
    id: 'mw4',
    title: 'A Good Name With God Is the Best Asset',
    speaker: 'Samuel Herd',
    thumbnailUrl: 'https://picsum.photos/seed/mw4/600/400',
  },
  {
    id: 'mw5',
    title: 'Jehovah’s Reminders Are Righteous',
    speaker: 'David Splane',
    thumbnailUrl: 'https://picsum.photos/seed/mw5/600/400',
  },
  {
    id: 'mw6',
    title: '“The Word of God Is Alive and Exerts Power”',
    speaker: 'Gerrit Lösch',
    thumbnailUrl: 'https://picsum.photos/seed/mw6/600/400',
  },
  {
    id: 'mw7',
    title: 'Keep Your Eyes on the Prize',
    speaker: 'Kenneth Cook, Jr.',
    thumbnailUrl: 'https://picsum.photos/seed/mw7/600/400',
  },
  {
    id: 'mw8',
    title: 'Benefit From Jehovah’s Loving-Kindness',
    speaker: 'Mark Sanderson',
    thumbnailUrl: 'https://picsum.photos/seed/mw8/600/400',
  },
];

export const fetchMorningWorshipVideos = async (): Promise<Video[]> => {
  console.log('Fetching mock video data...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVideos);
    }, 1500); // Simulate network delay
  });
};
