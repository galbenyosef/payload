import { Specialty } from '@/payload-types'

const generateBasicSpecialties = (): Specialty[] => {
  const SPECIALTIES = [
    'Internal Medicine',
    'Surgery',
    'Pediatrics',
    'Radiology',
    'Neurology',
    'Psychiatry',
    'Dermatology',
    'Anesthesiology',
    'Cardiology',
    'Orthopedics',
    'Oncology',
    'Ophthalmology',
    'Pathology',
    'Emergency Medicine',
    'Family Medicine',
    'Obstetrics',
    'Gynecology',
    'Urology',
    'Endocrinology',
    'Gastroenterology',
  ]

  const timestamp = new Date().toISOString()

  return SPECIALTIES.map(
    (name, index): Specialty => ({
      id: index + 1,
      name,
      updatedAt: timestamp,
      createdAt: timestamp,
    }),
  )
}

export { generateBasicSpecialties }
