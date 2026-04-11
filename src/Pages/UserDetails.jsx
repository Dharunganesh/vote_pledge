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
  will_vote: false,
  wont_accept_bribe: false
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

    // ✅ Phone validation
    if (!phone) {
      setErrorMessage('Enter valid phone number')
      return
    }

    // ✅ Age validation
    if (!age || Number(age) < 18) {
      setErrorMessage('Age must be 18+')
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

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to save')
      }

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
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#001d44] leading-tight mb-4">
            உங்கள் விவரங்களை{" "}
            <span className="text-[#6b9bef]">உறுதிப்படுத்தவும்</span>
            <br />
            <span className="text-2xl md:text-3xl font-bold opacity-80">
              Confirm Your Details
            </span>
          </h1>

          <p className="text-[#43474f] max-w-2xl text-lg">
            வாக்காளர் உறுதிமொழி ஏற்பதற்கு முன் உங்கள் விவரங்கள் சரியாக இருப்பதை
            உறுதி செய்யவும்.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow">
          <form className="space-y-8" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">பெயர் / Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-4 rounded-xl mt-2"
                  required
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">பிறந்த தேதி</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-4 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">வயது / Age</label>
                <input value={age} readOnly className="w-full bg-gray-200 p-4 rounded-xl mt-2" />
              </div>

              {/* District */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">மாவட்டம்</label>
                <div className="bg-gray-200 p-4 rounded-xl mt-2 font-bold">
                  இராணிப்பேட்டை / Ranipet
                </div>
              </div>

              {/* Town */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">ஊர் / Town</label>
                <input
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-4 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Block */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">வட்டம் / Block</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-4 rounded-xl mt-2"
                >
                  <option value="Arakonam">Arakonam</option>
                  <option value="Arcot">Arcot</option>
                  <option value="Walaja">Walaja</option>
                  <option value="Nemili">Nemili</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">Phone</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full bg-gray-100 p-4 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-semibold text-[#001d44]">Gender</label>
                <div className="flex gap-4 mt-2">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                    /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                    /> Female
                  </label>
                </div>
              </div>

            </div>

            {/* Messages */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => navigate('/')} className="text-gray-500">
                Back
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#001d44] text-white px-6 py-3 rounded-xl"
              >
                {submitting ? 'Saving...' : 'Continue'}
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  )
}
