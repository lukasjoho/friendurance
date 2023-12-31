export interface MetaDataData {
  title: string;
  description: string;
  slug?: string;
  imageUrl?: string;
}

export const createMetaDataObject = (data: MetaDataData) => {
  const {
    title,
    description,
    imageUrl = 'https://res.cloudinary.com/dum2lqmke/image/upload/v1692958978/og-image_tssqjm.jpg',
    slug,
  } = data;

  return {
    title: `${title} - Friendurance`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.HOST_URL}${slug && '/'}${slug}`,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      url: `${process.env.HOST_URL}${slug && '/'}${slug}`,
      images: [imageUrl],
    },
  };
};
