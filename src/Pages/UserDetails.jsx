import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

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

  if (digits.length === 10) {
    return `+91${digits}`
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`
  }

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
        console.log("BACKEND ERROR:", data)
        throw new Error(data.detail || 'Failed to save')
      }

      setSuccessMessage('Saved successfully ✅')
      localStorage.setItem("phone", phone)
      localStorage.setItem("name", formData.name)
      navigate("/pledge")
      setFormData(initialForm)

    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 sm:pt-24 pb-10 px-3 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">

        {/* Title */}
        <div className="mb-8 sm:mb-12 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-orange-600 leading-tight">
            உங்கள் விவரங்களை{" "}
            <span className="text-black">உறுதிப்படுத்தவும்</span>
            <br />
            <span className="text-lg sm:text-xl md:text-2xl opacity-80">
              Confirm Your Details
            </span>
          </h1>

          <p className="text-[#43474f] mt-3 max-w-2xl text-sm sm:text-base md:text-lg mx-auto sm:mx-0">
            வாக்காளர் உறுதிமொழி ஏற்பதற்கு முன் உங்கள் விவரங்கள் சரியாக இருப்பதை உறுதி செய்யவும்.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow">

          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

              {/* Name */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  பெயர் / Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                  required
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  பிறந்த தேதி
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  வயது / Age
                </label>
                <input
                  value={age}
                  readOnly
                  className="w-full bg-gray-200 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                />
              </div>

              {/* District */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  மாவட்டம்
                </label>
                <div className="bg-gray-200 p-3 sm:p-4 rounded-xl mt-2 font-bold text-sm sm:text-base">
                  இராணிப்பேட்டை / Ranipet
                </div>
              </div>

              {/* Town */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  ஊர் / Town
                </label>
                <input
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Block */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  வட்டம் / Block
                </label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                >
                  <option value="Arakonam">Arakonam</option>
                  <option value="Arcot">Arcot</option>
                  <option value="Walaja">Walaja</option>
                  <option value="Nemili">Nemili</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  Phone
                </label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                  Gender
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2 text-sm sm:text-base">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                    />
                    Male
                  </label>

                  <label className="flex items-center gap-2">
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
              </div>

            </div>

            {/* Messages */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto text-gray-500 text-sm sm:text-base"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-xl text-sm sm:text-base"
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
