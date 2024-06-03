const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 59 }, (_, i) => i.toString().padStart(2, '0'))

export { hours, minutes }