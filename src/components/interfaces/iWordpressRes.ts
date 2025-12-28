interface iWordpressResponse {
  author: number;
  categories: Array<any>;
  class_list: Array<string>;
  comment_status: string;
  date: string;
  date_gmt: string;
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  format: string;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  meta: {
    footnotes: string;
  };
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  sticky: boolean;
  tags: Array<any>;
  template: string;
  title: {
    rendered: string;
  };
  type: string;
}

export default iWordpressResponse;
