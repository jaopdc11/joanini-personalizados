import { contact } from '@/data/content'

export function whatsappLink(message?: string): string {
  const phone = contact.whatsappNumber.replace(/\D/g, '')
  const text = message ?? contact.defaultMessage
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
