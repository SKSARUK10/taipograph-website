import { Icon } from './Icons.jsx';
import { whatsappHref } from '../lib/whatsapp.js';

// Floating click-to-chat button (free: just a link, no API or server needed).
export default function WhatsAppButton() {
  return (
    <a className="wa" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Chat with TAIPOGRAPH on WhatsApp">
      <Icon name="chat" className="ic wai" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
