import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

const initialForm = {
  name: '',
  dob: '',
  gender: '',
  district: 'Ranipet',
  area_type: '',
  block: '',
  ulb: '',
  constituency: '',
  category: '',
  college: '',
  shg_number: '',
  phone_number: '',
  first_time_voter: '',
  panchayat: ''
}

// 🔥 Block → Panchayat mapping (placeholder)
const panchayatData = {
  Arakkonam: ["Ammanoor", "Kainoor", "Melpakkam"],
  Arcot: ["Anathangal", "Arumbakkam", "Pudupadi"],
  Kaveripakkam: ["Alapakkam", "Banavaram", "Ocheri"],
  Nemili: ["Agavalam", "Arigilapadi", "Velithangi"],
  Sholingur: ["Akkachikuppam", "Govindacheri", "Velam"],
  Thimiri: ["Agaram", "Aroor", "Mosur"],
  Walaja: ["Anandalai", "Bagaveli", "Lalapet"]
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
  ) age--

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

  // 🔥 dynamic panchayat list
  const panchayatOptions = panchayatData[formData.block] || []

  const handleChange = (e) => {
    const { name, value } = e.target

    // reset panchayat when block changes
    if (name === "block") {
      setFormData(prev => ({
        ...prev,
        block: value,
        panchayat: ''
      }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phone = normalizePhoneNumber(formData.phone_number)

    if (!phone) return setErrorMessage('Enter valid phone number')
    if (!age || Number(age) < 18) return setErrorMessage('Age must be 18+')

    if (!formData.area_type || !formData.constituency || !formData.category || !formData.gender) {
      return setErrorMessage('Please fill all required fields')
    }

    if (formData.category === 'College/Institution' && !formData.first_time_voter) {
      return setErrorMessage('Please select if you are a first-time voter')
    }

    if (formData.area_type === 'rural' && !formData.panchayat) {
      return setErrorMessage('Please select panchayat')
    }

    const payload = {
      ...formData,
      age: Number(age),
      phone_number: phone,
      first_time_voter: formData.first_time_voter === 'yes'
    }

    try {
      setSubmitting(true)
      setErrorMessage('')
      setSuccessMessage('')

      const { error } = await supabase
        .from('voters')
        .upsert(payload, { onConflict: "phone_number" })

      if (error) throw error

      setSuccessMessage('Saved successfully ✅')

      navigate("/pledge", {
        state: { phone, name: formData.name }
      })

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

              {/* --- YOUR UI COMPLETELY SAME --- */}

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">கிராமம் / நகரம் (Rural / Urban)</label>
                <select name="area_type" value={formData.area_type}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                  <option value="" disabled>Select Type</option>
                  <option value="rural">Rural</option>
                  <option value="urban">Urban</option>
                </select>
              </div>

              {formData.area_type === 'rural' && (
                <>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பிளாக் / Block</label>
                    <select name="block" value={formData.block}
                      onChange={handleChange}
                      className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                      <option value="" disabled>Select Block</option>
                      <option>Arakkonam</option>
                      <option>Arcot</option>
                      <option>Kaveripakkam</option>
                      <option>Nemili</option>
                      <option>Sholingur</option>
                      <option>Thimiri</option>
                      <option>Walaja</option>
                    </select>
                  </div>

                  {/* 🔥 Panchayat dropdown */}
                  {formData.block && (
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                        கிராம பஞ்சாயத்து / Gram Panchayat
                      </label>
                      <select
                        name="panchayat"
                        value={formData.panchayat}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                        required
                      >
                        <option value="" disabled>Select Panchayat</option>
                        {panchayatOptions.map((p, i) => (
                          <option key={i} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

            </div>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-orange-600 text-white px-6 py-3 rounded-xl"
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
