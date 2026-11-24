import { SITE } from '../data/content.js';

// https://wa.me/<number>?text=<message>  (official click-to-chat link; opens the app on phones, WhatsApp Web on desktop)
export const whatsappHref = (text = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
