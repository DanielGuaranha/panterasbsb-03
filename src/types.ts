
export interface Companion {
  id: string;
  slug: string;
  display_name: string;
  short_bio: string;
  full_bio: string;
  state: string;
  city: string;
  neighborhood: string;
  is_vip: boolean;
  created_at: string;
  featured_until: string | null;
  whatsapp_number: string;
  telegram_handle?: string;
  base_price?: number;
  pricing_mode: 'fixed' | 'negotiable' | 'contact' | 'hidden';
  age: number;
  height_cm: number;
  weight_kg: number;
  ethnicity: string;
  hair_color: string;
  eye_color: string;
  languages: string[];
  measurements: string;
  serves_men: boolean;
  serves_women: boolean;
  serves_couples: boolean;
  whatsapp_backup_number?: string;
  whatsapp_status: 'active' | 'banned' | 'testing';
  display_phone?: boolean; // Novo campo para controle de visibilidade
  image_url?: string; // Virtual field for main image
}

export interface GalleryItem {
  id: string;
  companion_id: string;
  media_type: 'image' | 'video';
  url: string;
  is_premium: boolean;
  is_free: boolean;
  unlock_price?: number; // Preço individual para desbloqueio
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Booking {
  id?: string;
  companion_id: string;
  client_contact: string;
  preferred_datetime: string;
  notes: string;
  payment_method: 'pix' | 'crypto' | 'card';
  crypto_coin?: string;
  status: 'pending' | 'confirmed' | 'simulated';
}

// --- CHAT SYSTEM ---
export interface CompanionChat {
  id: string;
  companion_id: string;
  client_session_id: string;
  client_nickname?: string;
  status: 'active' | 'archived' | 'blocked';
  last_message_at: string;
  last_message_preview?: string;
  unread_count_companion: number;
  unread_count_client: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_type: 'client' | 'companion' | 'system';
  message_text: string;
  read_at?: string | null;
  created_at: string;
  attachment_url?: string;
  attachment_type?: 'image' | 'video' | 'payment_request';
}

// --- LIVESTREAM SYSTEM (New) ---
export interface LiveSession {
  id: string;
  companion_id: string;
  title: string;
  status: 'scheduled' | 'live' | 'ended';
  scheduled_for?: string;
  started_at?: string;
  ended_at?: string;
  price_per_minute?: number; // 0 for public/free preview
  entry_fee?: number;
  viewer_count: number;
  is_private: boolean; // 1-on-1 vs Broadcast
  thumbnail_url?: string;
}

// --- FINANCIAL SYSTEM (New) ---
export interface Transaction {
  id: string;
  user_session_id: string; // Anonymous ID or User ID
  companion_id: string;
  type: 'gallery_unlock' | 'live_entry' | 'tip' | 'booking_deposit';
  amount: number;
  currency: 'BRL' | 'USDT' | 'BTC';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'pix' | 'card' | 'crypto';
  gateway_id?: string;
  created_at: string;
}

export interface CompanionReview {
  id: string;
  companion_id: string;
  client_pseudonym: string;
  rating: number;
  title: string | null;
  body: string | null;
  tags: string[];
  visit_verified: boolean;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CompanionWithGallery extends Companion {
  gallery_items: GalleryItem[];
  categories: Category[];
}
