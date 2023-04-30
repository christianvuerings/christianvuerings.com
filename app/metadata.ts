const author = {
  name: 'Christian Vuerings',
  twitter: '@christianvuer',
  github: '@christianvuerings',
  email: 'vueringschristian@gmail.com',
  website: 'https://christianvuerings.com',
};

const defaultTitle = 'Christian Vuerings';
const defaultDescription =
  'Christian Vuerings is a software engineer based in California & loves to share interesting ideas and approaches to problems';

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://christianvuerings.com';

export const defaultMetadata = {
  title: {
    template: '%s | Christian Vuerings',
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    'christian vuerings',
    'vuerings',
    'software engineer',
    'open source',
    'javascript',
    'nodejs',
    'react',
  ],
  author,
  authors: [author],
  colorSchema: 'dark',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    article: {
      published_time: '',
    },
    sitename: defaultTitle,
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    shortcut: './favicon.ico',
  },
};

export const createMetadata = ({
  date,
  description,
  tags,
  title,
}: {
  date: string;
  description: string;
  tags: string[];
  title: string;
}) => {
  const metadata = { ...defaultMetadata };
  metadata.title.default = title;
  metadata.description = description;
  metadata.keywords = [...tags, ...metadata.keywords];
  metadata.openGraph.title = title;
  metadata.openGraph.description = description;
  metadata.openGraph.article.published_time = date;
  return metadata;
};
