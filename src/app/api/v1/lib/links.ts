export const _commentsLinks = {
  get: {
    href: "/api/v1/task/{commentId}/comments",
  },
  post: {
    href: "/api/v1/task/{commentId}/comments",
  },
  delete: {
    href: "/api/v1/comments/{commentId}",
  },
};

export const _tasksLinks = {
  getAll: {
    href: "/api/v1/projects/{projectId]/tasks",
  },
  getOne: {
    href: "/api/v1/tasks/{tasksId}",
  },
  post: {
    href: "/api/v1/projects/{projectId]/tasks",
  },
  delete: {
    href: "/api/v1/tasks/{tasksId]}",
  },
  update: {
    href: "/api/v1/tasks/{tasksId}",
  },
};

export const _projectsLinks = {
  getAll: {
    href: "/api/v1/projects",
  },
  getOne: {
    href: "/api/v1/projects/{projectId}",
  },
  post: {
    href: "/api/v1/projects",
  },
  delete: {
    href: "/api/v1/projects/{projectId}",
  },
  update: {
    href: "/api/v1/projects/{projectId}",
  },
};

export const _membersLinks = {
  getAll: {
    href: "/api/v1/projects/{projectId]/members",
  },
  post: {
    href: "/api/v1/projects/{projectId]/members",
  },
  delete: {
    href: "/api/v1/members/{membersId]",
  },
};
