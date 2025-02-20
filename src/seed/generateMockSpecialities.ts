const createHierarchicalSpecialties = async (payload: any) => {
  // Create first level - Parent specialties
  const parentSpecialties = [
    'Internal Medicine',
    'Surgery',
    'Pediatrics',
    'Radiology',
    'Neurology',
    'Cardiology',
    'Gastroenterology',
    'Endocrinology',
    'Hematology',
    'Nephrology',
    'Oncology',
    'Rheumatology',
    'Infectious Diseases',
    'Dermatology',
    'Neuro Surgery',
    'Orthopedics',
    'Otolaryngology',
    'Ophthalmology',
    'Urology',
    'General Surgery',
    'Vascular Surgery',
    'Plastic Surgery',
    'ENT',
    'Gynecology',
    'Obstetrics',
    'Neonatology',
    'Pediatric Surgery',
    'Orthodontics',
    'Dental Surgery',
    'Cardiovascular Surgery',
    'Neuro Radiology',
    'Emergency Medicine',
    'Pathology',
    'Laboratory Medicine',
  ]

  const childSpecialties = [
    'Allergy and Immunology',
    'Anesthesiology',
    'Critical Care Medicine',
    'Geriatrics',
    'Nuclear Medicine',
    'Pain Medicine',
    'Sports Medicine',
    'Thoracic Surgery',
  ]

  const grandChildSpecialties = [
    'Clinical Genetics',
    'Clinical Neurophysiology',
    'Medical Oncology',
    'Pediatric Hematology',
    'Reproductive Endocrinology',
  ]

  const parentIds = []
  const childIds = []

  // Helper function to generate slugs
  const generateSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-')

  // Helper function to check for existing title
  const exists = async (title: string) => {
    const existing = await payload.find({
      collection: 'specialties',
      where: { title: { equals: title } },
    })
    return existing.docs.length > 0
  }

  // Create parent specialties
  for (const specialtyName of parentSpecialties) {
    if (!(await exists(specialtyName))) {
      const { id: parentId } = await payload.create({
        collection: 'specialties',
        data: {
          title: specialtyName,
          slug: generateSlug(specialtyName),
          parent: null,
        },
      })
      parentIds.push(parentId)
    }
  }

  // Create second level - Children
  for (const parentId of parentIds) {
    for (const specialtyName of childSpecialties) {
      if (!(await exists(specialtyName))) {
        const { id: childId } = await payload.create({
          collection: 'specialties',
          data: {
            title: specialtyName,
            slug: generateSlug(specialtyName),
            parent: parentId,
          },
        })
        childIds.push(childId)
      }
    }
  }

  // Create third level - Grandchildren
  for (const childId of childIds) {
    for (const specialtyName of grandChildSpecialties) {
      if (!(await exists(specialtyName))) {
        await payload.create({
          collection: 'specialties',
          data: {
            title: specialtyName,
            slug: generateSlug(specialtyName),
            parent: childId,
          },
        })
      }
    }
  }
}

export { createHierarchicalSpecialties }
