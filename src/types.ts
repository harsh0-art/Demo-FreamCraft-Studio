export type Language = 'en' | 'hi';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  titleHi: string;
  category: 'weddings' | 'pre-wedding' | 'events' | 'portraits' | 'brands' | 'videos';
  categoryLabel: string;
  categoryLabelHi: string;
  videoUrl?: string; // If it's a video showcase
}

export interface ServiceItem {
  id: string;
  icon: string; // lucide icon name
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  startingPrice: string;
  startingPriceHi: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  titleHi: string;
  price: string;
  priceHi: string;
  duration: string;
  durationHi: string;
  editedPhotos: string;
  editedPhotosHi: string;
  deliveryTimeline: string;
  deliveryTimelineHi: string;
  inclusions: string[];
  inclusionsHi: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  nameHi: string;
  eventType: string;
  eventTypeHi: string;
  rating: number;
  comment: string;
  commentHi: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
}
