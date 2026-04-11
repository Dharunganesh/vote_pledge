import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_URL

const initialForm = {
  name: '',
  dob: '',
  gender: 'male',
  block: 'Arakonam',
  town: 'Ranipet',
  phone_number: '',
}

function calculateAge(dob) {
  if (!dob) return ''

  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age >= 0 ? String(age) : ''
}

function normalizePhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, '')

  if (digits.length === 10) return `+91${digits}`
  if (digits.length > 10) return `+${digits}`

  return ''
}

export default function UserDetails() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const age = calculateAge(formData.dob)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phone = normalizePhoneNumber(formData.phone_number)

    if (!phone) {
      setErrorMessage('Enter valid phone number')
      return
    }

    const payload = {
      ...formData,
      age: Number(age),
      phone_number: phone,
    }

    try {
      setSubmitting(true)
      setErrorMessage('')
      setSuccessMessage('')

      const res = await fetch(`${API_BASE_URL}/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to save')

      setSuccessMessage('Saved successfully ✅')
      setFormData(initialForm)
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">User Details</h2>

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" required />

        <input value={age} readOnly className="w-full p-2 border rounded bg-gray-100" />

        <input name="town" placeholder="Town" value={formData.town} onChange={handleChange} className="w-full p-2 border rounded" required />

        <input name="phone_number" placeholder="Phone" value={formData.phone_number} onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white p-2 rounded">
          {submitting ? 'Saving...' : 'Submit'}
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button type="button" onClick={() => navigate('/')} className="text-sm text-blue-500">
          Go Back
        </button>
      </form>
    </div>
  )
}
