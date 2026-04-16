import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

const initialForm = {
  name: '',
  dob: '',
  gender: 'male',
  district: 'Ranipet',
  area_type: 'rural',
  block: 'Arakkonam',
  ulb: '',
  panchayat: '',
  constituency: 'Arakkonam',
  category: 'General Public',
  college: '',
  shg_number: '',
  phone_number: ''
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      ...formData,
      age: Number(age),
      phone_number: phone
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
        state: {
          phone,
          name: formData.name
        }
      })

    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />

      <main className="pt-20 pb-24 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          உங்கள் விவரங்கள் / Your Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">

          {/* Name */}
          <div>
            <label className="font-semibold">பெயர் / Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2" required />
          </div>

          {/* DOB */}
          <div>
            <label className="font-semibold">பிறந்த தேதி / Date of Birth</label>
            <input type="date" name="dob" value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2" required />
          </div>

          {/* Age */}
          <div>
            <label className="font-semibold">வயது / Age</label>
            <input value={age} readOnly className="w-full p-3 bg-gray-200 rounded mt-2" />
          </div>

          {/* District */}
          <div>
            <label className="font-semibold">மாவட்டம் / District</label>
            <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 rounded mt-2" />
          </div>

          {/* Rural/Urban */}
          <div>
            <label className="font-semibold">Rural / Urban</label>
            <select name="area_type" value={formData.area_type} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2">
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>

          {/* Block */}
          {formData.area_type === 'rural' && (
            <div>
              <label className="font-semibold">Block</label>
              <select name="block" value={formData.block} onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded mt-2">
                <option>Arakkonam</option>
                <option>Arcot</option>
                <option>Kaveripakkam</option>
                <option>Nemili</option>
                <option>Sholingur</option>
                <option>Thimiri</option>
                <option>Walaja</option>
              </select>
            </div>
          )}

          {/* ULB */}
          {formData.area_type === 'urban' && (
            <div>
              <label className="font-semibold">ULB</label>
              <input name="ulb" value={formData.ulb} onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded mt-2" />
            </div>
          )}

          {/* Panchayat */}
          <div>
            <label className="font-semibold">Panchayat Name</label>
            <input name="panchayat" value={formData.panchayat}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2" required />
          </div>

          {/* Constituency */}
          <div>
            <label className="font-semibold">Assembly Constituency</label>
            <select name="constituency" value={formData.constituency}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2">
              <option>Arakkonam</option>
              <option>Sholingur</option>
              <option>Ranipet</option>
              <option>Arcot</option>
              <option>Katpadi</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select name="category" value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2">
              <option>College/Institution</option>
              <option>General Public</option>
              <option>SHG Members</option>
              <option>Industries Employee</option>
              <option>Government Employees</option>
            </select>
          </div>

          {/* College */}
          {formData.category === 'College/Institution' && (
            <div>
              <label className="font-semibold">College</label>
              <input name="college" value={formData.college}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded mt-2" />
            </div>
          )}

          {/* SHG */}
          {formData.category === 'SHG Members' && (
            <div>
              <label className="font-semibold">SHG Number</label>
              <input name="shg_number" value={formData.shg_number}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded mt-2" />
            </div>
          )}

          {/* Gender */}
          <div>
            <label className="font-semibold">Gender</label>
            <select name="gender" value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <input name="phone_number" value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded mt-2" required />
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <button type="submit" disabled={submitting}
            className="w-full bg-orange-600 text-white p-3 rounded">
            {submitting ? 'Saving...' : 'Continue'}
          </button>

        </form>
      </main>
    </div>
  )
}
