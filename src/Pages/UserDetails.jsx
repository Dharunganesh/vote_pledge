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
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

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

    if (!phone) return setErrorMessage('Enter valid phone number')
    if (!age || Number(age) < 18) return setErrorMessage('Age must be 18+')

    // Basic required dropdown validation
    if (!formData.area_type || !formData.constituency || !formData.category || !formData.gender) {
      return setErrorMessage('Please fill all required fields')
    }

    const payload = {
      ...formData,
      age: Number(age),
      phone_number: phone,
      panchayat: "Ranipet"
    }

    try {
      setSubmitting(true)
      setErrorMessage('')

      const { error } = await supabase
        .from('voters')
        .upsert(payload, { onConflict: "phone_number" })

      if (error) throw error

      navigate("/pledge", {
        state: { phone, name: formData.name }
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

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">

          {/* Name */}
          <div>
            <label>பெயர் / Name</label>
            <input name="name" value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required />
          </div>

          {/* DOB */}
          <div>
            <label>Date of Birth / பிறந்த தேதி</label>
            <input type="date" name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required />
          </div>

          {/* Age */}
          <div>
            <label>Age / வயது</label>
            <input value={age} readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          {/* District */}
          <div>
            <label>District / மாவட்டம்</label>
            <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          {/* Rural / Urban */}
          <div>
            <label>Rural / Urban</label>
            <select name="area_type" value={formData.area_type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>Select Type</option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>

          {/* Block */}
          {formData.area_type === 'rural' && (
            <div>
              <label>Block</label>
              <select name="block" value={formData.block}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded" required>
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
          )}

          {/* ULB */}
          {formData.area_type === 'urban' && (
            <div>
              <label>ULB</label>
              <select name="ulb" value={formData.ulb}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded" required>
                <option value="" disabled>Select ULB</option>
                <option>Ranipet Municipality</option>
                <option>Arcot Municipality</option>
                <option>Walaja Municipality</option>
              </select>
            </div>
          )}

          {/* Panchayat */}
          <div>
            <label>Panchayat Name</label>
            <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          {/* Constituency */}
          <div>
            <label>Assembly Constituency</label>
            <select name="constituency" value={formData.constituency}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>Select Constituency</option>
              <option>Arakkonam</option>
              <option>Sholingur</option>
              <option>Ranipet</option>
              <option>Arcot</option>
              <option>Katpadi</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label>Category</label>
            <select name="category" value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>Select Category</option>
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
              <label>Select College</label>
              <select name="college" value={formData.college}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded">
                <option value="" disabled>Select College</option>
                <option>SRM University</option>
                <option>VIT</option>
                <option>Loyola College</option>
              </select>
            </div>
          )}

          {/* SHG */}
          {formData.category === 'SHG Members' && (
            <div>
              <label>SHG Number</label>
              <input name="shg_number" value={formData.shg_number}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded" />
            </div>
          )}

          {/* Gender */}
          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <input name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required />
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button type="submit" disabled={submitting}
            className="w-full bg-orange-600 text-white p-3 rounded">
            {submitting ? 'Saving...' : 'Continue'}
          </button>

        </form>
      </main>
    </div>
  )
}
