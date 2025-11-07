export interface Establishment {
  imageUrl: string;
  title: string;
  totalScore: number;
  reviewsCount: number;
  street: string;
  city: string;
  state: string;
  countryCode: string;
  website: string;
  phone: string;
  categoryName: 'Brewery' | 'Distillery' | 'Winery' | 'Vineyard';
  url: string;
}

export type EstablishmentCategory = Establishment['categoryName'];