import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

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
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`

  return ''
}

export default function UserDetails() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const savedPhone = localStorage.getItem("phone")
    if (savedPhone) {
      setFormData(prev => ({ ...prev, phone_number: savedPhone }))
    }
  }, [])

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

    if (!age || Number(age) < 18) {
      setErrorMessage('Age must be 18+')
      return
    }

    const payload = {
      name: formData.name,
      dob: formData.dob,
      age: Number(age),
      gender: formData.gender,
      block: formData.block,
      town: formData.town,
      phone_number: phone,
      will_vote: false,
      wont_accept_bribe: false
    }

    try {
      setSubmitting(true)
      setErrorMessage('')
      setSuccessMessage('')

      // 🔥 Supabase UPSERT
      const { data, error } = await supabase
        .from('voters')
        .upsert(payload)
        .select()

      if (error) throw error

      setSuccessMessage('Saved successfully ✅')

      navigate("/pledge", {
        state: {
          phone: phone,
          name: formData.name
        }
      })

      setFormData(initialForm)

    } catch (err) {
      console.error(err)
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col">
      <Navbar />

      <main className="grow pt-5 lg:pt-5 sm:pt-24 pb-28 px-3 sm:px-6 md:px-8 md:py-5 max-w-5xl mx-auto w-full">

        <div>
          <button
            className='bg-orange-600 w-max px-5 text-sm text-white py-2 rounded-full mb-1 hover:bg-orange-700'
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        <div className="mb-8 sm:mb-12 lg:mb-3 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-orange-600 leading-tight">
            உங்கள் விவரங்களை <br />
            <span className="text-lg sm:text-xl md:text-2xl opacity-80">
              Confirm Your Details
            </span>
          </h1>

          <p className="text-[#43474f] mt-3 lg:mt-1 max-w-2xl text-sm sm:text-base md:text-lg mx-auto sm:mx-0">
            வாக்காளர் உறுதிமொழி ஏற்பதற்கு முன் உங்கள் விவரங்கள் சரியாக இருப்பதை உறுதி செய்யவும்.
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow">

          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பெயர் / Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பிறந்த தேதி</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">வயது / Age</label>
                <input
                  value={age}
                  readOnly
                  className="w-full bg-gray-200 p-3 sm:p-4 rounded-xl mt-2"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">மாவட்டம்</label>
                <div className="bg-gray-200 p-3 sm:p-4 rounded-xl mt-2 font-bold">
                  இராணிப்பேட்டை / Ranipet
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">ஊர் / Town</label>
                <input
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">வட்டம் / Block</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                >
                  <option value="Arakonam">Arakonam</option>
                  <option value="Arcot">Arcot</option>
                  <option value="Walaja">Walaja</option>
                  <option value="Nemili">Nemili</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">Phone</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">Gender</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2">
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

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] 
                           bg-orange-600 text-white px-6 py-3 sm:py-4 
                           rounded-xl text-sm sm:text-base md:text-lg 
                           font-semibold shadow 
                           hover:bg-orange-700 active:scale-95 
                           transition-all duration-200"
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
