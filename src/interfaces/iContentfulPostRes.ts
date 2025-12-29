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
    id: number;
    title: string;
    post: any; // or use Document from '@contentful/rich-text-types'
    publishedDate: string;
    author: string;
    excerpt: string;
    featuredImage?: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
    // Add any other fields your blog post has
  };
  metadata: {
    tags: any[];
  };
}

export default iContentfulPostRes;
