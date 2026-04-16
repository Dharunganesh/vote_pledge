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

// 🔥 Block → Panchayat mapping (sample)
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

  const panchayatOptions = panchayatData[formData.block] || []

  const handleChange = (e) => {
    const { name, value } = e.target

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

        <button
          className='bg-orange-600 px-5 text-white py-2 rounded-full mb-2'
          onClick={() => navigate("/")}
        >
          Back
        </button>

        <div className="bg-white p-6 rounded-2xl shadow">

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">

              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />

              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

              <input value={age} readOnly placeholder="Age" />

              <select name="area_type" value={formData.area_type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>

              {formData.area_type === 'rural' && (
                <>
                  <select name="block" value={formData.block} onChange={handleChange} required>
                    <option value="">Select Block</option>
                    <option>Arakkonam</option>
                    <option>Arcot</option>
                    <option>Kaveripakkam</option>
                    <option>Nemili</option>
                    <option>Sholingur</option>
                    <option>Thimiri</option>
                    <option>Walaja</option>
                  </select>

                  {formData.block && (
                    <select name="panchayat" value={formData.panchayat} onChange={handleChange} required>
                      <option value="">Select Panchayat</option>
                      {panchayatOptions.map((p, i) => (
                        <option key={i}>{p}</option>
                      ))}
                    </select>
                  )}
                </>
              )}

              {formData.area_type === 'urban' && (
                <select name="ulb" value={formData.ulb} onChange={handleChange} required>
                  <option value="">Select ULB</option>
                  <option>Ranipet MP</option>
                </select>
              )}

              <select name="constituency" value={formData.constituency} onChange={handleChange} required>
                <option value="">Select Constituency</option>
                <option>Ranipet</option>
              </select>

              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="College/Institution">College</option>
                <option value="General Public">Public</option>
              </select>

              {formData.category === 'College/Institution' && (
                <>
                  <input name="college" value={formData.college} onChange={handleChange} placeholder="College" required />

                  <select name="first_time_voter" value={formData.first_time_voter} onChange={handleChange} required>
                    <option value="">First Time Voter?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </>
              )}

              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone" required />

            </div>

            <button type="submit">
              {submitting ? 'Saving...' : 'Continue'}
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}
