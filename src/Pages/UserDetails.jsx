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
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm h-16 flex items-center justify-between px-6">
        <span className="text-lg font-bold text-[#001d44]">
          இராணிப்பேட்டை மாவட்டம் / Ranipet District
        </span>
      </header>

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto w-full">

        {/* Title */}
        <div className="mb-12">
  <h1 className="text-4xl md:text-5xl font-extrabold text-[#001d44] leading-tight tracking-tight mb-4">
    உங்கள் விவரங்களை{" "}
    <span className="text-[#6b9bef]">உறுதிப்படுத்தவும்</span>
    <br />
    <span className="text-2xl md:text-3xl font-bold opacity-80">
      Confirm Your Details
    </span>
  </h1>

  <p className="text-[#43474f] max-w-2xl text-lg leading-relaxed">
    வாக்காளர் உறுதிமொழி ஏற்பதற்கு முன் உங்கள் விவரங்கள் சரியாக இருப்பதை
    உறுதி செய்யவும். / Please verify that your details are correct before
    taking the voter pledge.
  </p>
</div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Name */}
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded"
              required
            />

            {/* DOB */}
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded"
              required
            />

            {/* Age */}
            <input
              value={age}
              readOnly
              className="w-full p-3 bg-gray-200 rounded"
            />

            {/* Town */}
            <input
              name="town"
              placeholder="Town"
              value={formData.town}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded"
              required
            />

            {/* Phone */}
            <input
              name="phone_number"
              placeholder="Phone"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded"
              required
            />

            {/* Gender */}
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#001d44] text-white py-3 rounded-xl"
            >
              {submitting ? 'Saving...' : 'Continue'}
            </button>

            {/* Messages */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-blue-500 text-sm"
            >
              Go Back
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}
