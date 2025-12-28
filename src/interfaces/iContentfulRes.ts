interface iContentfulResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: Array<{
    sys: {
      id: string;
      createdAt: string;
      updatedAt: string;
    };
    fields: {
      id: number;
      title: string;
      post: string;
      // ... add your other fields
    };
  }>;
}

export default iContentfulResponse;
