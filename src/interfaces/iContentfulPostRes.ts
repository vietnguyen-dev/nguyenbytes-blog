interface iContentfulPostRes {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    revision: number;
    contentType: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
    space: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
    environment: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
  };
  fields: {
    title: string;
    post: string; // or use Document from '@contentful/rich-text-types'
    // Add any other fields your blog post has
    dateCreated: Date;
  };
  metadata: {
    tags: any[];
  };
}

export default iContentfulPostRes;
