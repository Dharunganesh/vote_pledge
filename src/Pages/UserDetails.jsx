import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

const panchayatData = {
  ARAKONAM: ["AMBARISHIPURAM","AMMANOOR","ANAIKATAPUTHUR","ANAIPAKKAM","ANANTHAPURAM","ANWARTHIGANPET","ASAMANDUR","AUTHUR"],
  ARCOT: ["ANATHANGAL","ARAPAKKAM","ARUMBAKKAM","ARUNGUNDRAM","ATHITHANGAL","AYILAM"],
  KAVERIPAKKAM: ["ALAPAKKAM","ATHIPATTU","AVALOOR","AYARPADI"],
  NEMILI: ["AGAVALAM","ARIGILAPADI","ARUMBAKKAM"],
  SHOLINGHUR: ["AKKACHIKUPPAM","AYAL","AYPEDU"],
  THIMIRI: ["AGARAM","ALLALACHERI","ANAIMALLUR"],
  WALAJAH: ["ANANDALAI","BAGAVELI","CHENNASAMUDRAM"]
}

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
  panchayat_name: ''
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
  const [panchayatList, setPanchayatList] = useState([])
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

    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === "block") {
      setPanchayatList(panchayatData[value] || [])
      setFormData(prev => ({ ...prev, panchayat_name: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phone = normalizePhoneNumber(formData.phone_number)

    if (!phone) return setErrorMessage('Enter valid phone number')
    if (!age || Number(age) < 18) return setErrorMessage('Age must be 18+')

    if (!formData.area_type || !formData.constituency || !formData.category || !formData.gender) {
      return setErrorMessage('Please fill all required fields')
    }

    if (formData.area_type === 'rural' && !formData.panchayat_name) {
      return setErrorMessage('Please select panchayat')
    }

    if (formData.category === 'College/Institution' && !formData.first_time_voter) {
      return setErrorMessage('Please select first-time voter option')
    }

    const payload = {
      ...formData,
      age: Number(age),
      phone_number: phone,
      panchayat: formData.panchayat_name,
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

      <main className="grow pt-5 sm:pt-24 pb-28 px-3 max-w-5xl mx-auto w-full">

        <button
          className='bg-orange-600 px-5 text-white py-2 rounded-full mb-3'
          onClick={() => navigate("/")}
        >
          Back
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-orange-600">
            Confirm Your Details
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-6">

              <input name="name" placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required />

              <input type="date" name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required />

              <input value={age} readOnly className="bg-gray-200 p-3 rounded" />

              <div className="bg-gray-200 p-3 rounded font-bold">Ranipet</div>

              <select name="area_type" value={formData.area_type}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required>
                <option value="" disabled>Select Type</option>
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>

              {formData.area_type === 'rural' && (
                <>
                  <select name="block" value={formData.block}
                    onChange={handleChange}
                    className="bg-gray-100 p-3 rounded" required>
                    <option value="" disabled>Select Block</option>
                    <option>ARAKONAM</option>
                    <option>ARCOT</option>
                    <option>KAVERIPAKKAM</option>
                    <option>NEMILI</option>
                    <option>SHOLINGHUR</option>
                    <option>THIMIRI</option>
                    <option>WALAJAH</option>
                  </select>

                  {formData.block && (
                    <select name="panchayat_name"
                      value={formData.panchayat_name}
                      onChange={handleChange}
                      className="bg-gray-100 p-3 rounded" required>
                      <option value="" disabled>Select Panchayat</option>
                      {panchayatList.map((p, i) => (
                        <option key={i}>{p}</option>
                      ))}
                    </select>
                  )}
                </>
              )}

              <select name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required>
                <option value="" disabled>Select Constituency</option>
                <option>Arakkonam</option>
                <option>Sholingur</option>
                <option>Ranipet</option>
                <option>Arcot</option>
                <option>Katpadi</option>
              </select>

              <select name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required>
                <option value="" disabled>Select Category</option>
                <option value="College/Institution">College</option>
                <option value="General Public">Public</option>
                <option value="SHG Members">SHG</option>
              </select>

              {formData.category === 'College/Institution' && (
                <>
                  <input name="college"
                    placeholder="College"
                    value={formData.college}
                    onChange={handleChange}
                    className="bg-gray-100 p-3 rounded"
                    required
                  />

                  <select name="first_time_voter"
                    value={formData.first_time_voter}
                    onChange={handleChange}
                    className="bg-gray-100 p-3 rounded"
                    required>
                    <option value="" disabled>First Time Voter?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </>
              )}

              <select name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input name="phone_number"
                placeholder="Phone"
                value={formData.phone_number}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded" required />

            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <button type="submit"
              className="w-full bg-orange-600 text-white p-3 rounded">
              {submitting ? 'Saving...' : 'Continue'}
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}
