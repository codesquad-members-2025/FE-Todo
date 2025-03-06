const mockData = {
  columns: [
    {
      id: 'todo',
      title: '해야할 일',
      taskCount: 2,
      tasks: [
        {
          id: 1,
          title: 'GitHub 공부하기',
          content: 'add, commit, push',
          author: 'web',
          createdAt: '2025-03-06T10:00:00Z',
        },
        {
          id: 2,
          title: '제목 2',
          content: '내용 2',
          author: 'web',
          createdAt: '2025-03-06T11:00:00Z',
        },
      ],
    },
    {
      id: 'in-progress',
      title: '진행 중인 일',
      taskCount: 1,
      tasks: [
        {
          id: 3,
          title: '제목 3',
          content: '내용 3',
          author: 'web',
          createdAt: '2025-03-06T12:00:00Z',
        },
      ],
    },
    {
      id: 'completed',
      title: '완료한 일',
      taskCount: 3,
      tasks: [
        {
          id: 4,
          title: '제목 4',
          content: '내용 4',
          author: 'web',
          createdAt: '2025-03-06T13:00:00Z',
        },
        {
          id: 5,
          title: '제목 5',
          content: '내용 5',
          author: 'web',
          createdAt: '2025-03-06T14:00:00Z',
        },
        {
          id: 6,
          title: '제목 6',
          content: '내용 6',
          author: 'web',
          createdAt: '2025-03-06T15:00:00Z',
        },
      ],
    },
  ],
};

export default mockData;
