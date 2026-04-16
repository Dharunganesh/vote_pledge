import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

const initialForm = {
  name: '',
  dob: '',
  gender: 'male',
  district: 'Ranipet',
  area_type: 'rural', // rural or urban
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
          phone: phone,
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
          <input name="name" placeholder="Name"
            value={formData.name} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded" required />

          {/* DOB */}
          <input type="date" name="dob"
            value={formData.dob} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded" required />

          {/* Age */}
          <input value={age} readOnly className="w-full p-3 bg-gray-200 rounded" />

          {/* District */}
          <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 rounded" />

          {/* Rural / Urban */}
          <select name="area_type" value={formData.area_type} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded">
            <option value="rural">Rural</option>
            <option value="urban">Urban</option>
          </select>

          {/* Block (Rural) */}
          {formData.area_type === 'rural' && (
            <select name="block" value={formData.block} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded">
              <option>Arakkonam</option>
              <option>Arcot</option>
              <option>Kaveripakkam</option>
              <option>Nemili</option>
              <option>Sholingur</option>
              <option>Thimiri</option>
              <option>Walaja</option>
            </select>
          )}

          {/* ULB (Urban) */}
          {formData.area_type === 'urban' && (
            <input name="ulb" placeholder="ULB"
              value={formData.ulb} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded" />
          )}

          {/* Panchayat */}
          <input name="panchayat" placeholder="Panchayat Name"
            value={formData.panchayat} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded" required />

          {/* Constituency */}
          <select name="constituency" value={formData.constituency} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded">
            <option>Arakkonam</option>
            <option>Sholingur</option>
            <option>Ranipet</option>
            <option>Arcot</option>
            <option>Katpadi</option>
          </select>

          {/* Category */}
          <select name="category" value={formData.category} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded">
            <option>College/Institution</option>
            <option>General Public</option>
            <option>SHG Members</option>
            <option>Industries Employee</option>
            <option>Government Employees</option>
          </select>

          {/* College */}
          {formData.category === 'College/Institution' && (
            <input name="college" placeholder="Select College"
              value={formData.college} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded" />
          )}

          {/* SHG */}
          {formData.category === 'SHG Members' && (
            <input name="shg_number" placeholder="SHG Number"
              value={formData.shg_number} onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded" />
          )}

          {/* Gender */}
          <select name="gender" value={formData.gender} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>

          {/* Phone */}
          <input name="phone_number" placeholder="Phone"
            value={formData.phone_number} onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded" required />

          {/* Messages */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {/* Submit */}
          <button type="submit" disabled={submitting}
            className="w-full bg-orange-600 text-white p-3 rounded">
            {submitting ? 'Saving...' : 'Continue'}
          </button>

        </form>
      </main>
    </div>
  )
}
