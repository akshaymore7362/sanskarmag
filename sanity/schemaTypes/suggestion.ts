export default {
  name: 'suggestion',
  title: 'Reader Suggestions & Feedback',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Sender Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Corporate Email',
      type: 'string',
    },
    {
      name: 'topic',
      title: 'Suggestion Topic',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message Content',
      type: 'text',
    },
    {
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
