export const formatLocalDate = (dateString: string): string => {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date).replace(/\//g, '/').replace(',', '')
}

export const formatLocalDateDeadline = (dateString: string): string => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + Number(process.env.NEXT_PUBLIC_DEADLINE_DAYS))

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date).replace(/\//g, '/').replace(',', '')
}

export const isDeadline = (dateString: string): boolean => {
  const date = new Date(dateString)
  const deadlineDays = parseInt(process.env.NEXT_PUBLIC_DEADLINE_DAYS || '0', 10)
  date.setDate(date.getDate() + deadlineDays)
  const now = new Date()
  return date > now
}