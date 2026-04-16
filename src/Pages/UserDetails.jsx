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

          <div>
            <label>பெயர் / Name</label>
            <input name="name" value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required />
          </div>

          <div>
            <label>பிறந்த தேதி / Date of Birth</label>
            <input type="date" name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required />
          </div>

          <div>
            <label>வயது / Age</label>
            <input value={age} readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          <div>
            <label>மாவட்டம் / District</label>
            <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          <div>
            <label>கிராமம் / நகரம் (Rural / Urban)</label>
            <select name="area_type" value={formData.area_type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>வகையை தேர்வு செய்யவும் / Select Type</option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>

          {formData.area_type === 'rural' && (
            <div>
              <label>பிளாக் / Block</label>
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

          {formData.area_type === 'urban' && (
            <div>
              <label>நகராட்சி / ULB</label>
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

          <div>
            <label>பஞ்சாயத்து பெயர் / Panchayat Name</label>
            <input value="Ranipet" readOnly className="w-full p-3 bg-gray-200 mt-2 rounded" />
          </div>

          <div>
            <label>சட்டமன்ற தொகுதி / Assembly Constituency</label>
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

          <div>
            <label>வகை / Category</label>
            <select name="category" value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>வகையை தேர்வு செய்யவும் / Select Category</option>
              <option value="College/Institution">கல்லூரி / College/Institution</option>
              <option value="General Public">பொது மக்கள் / General Public</option>
              <option value="SHG Members">சுய உதவி குழு / SHG Members</option>
              <option value="Industries Employee">தொழிற்சாலை ஊழியர்கள் / Industries Employee</option>
              <option value="Government Employees">அரசு ஊழியர்கள் / Government Employees</option>
            </select>
          </div>

          {formData.category === 'College/Institution' && (
            <div>
              <label>கல்லூரி பெயர் / College Name</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded"
                required
              />
            </div>
          )}

          {formData.category === 'SHG Members' && (
            <div>
              <label>சுய உதவி குழு எண் / SHG Number</label>
              <input name="shg_number" value={formData.shg_number}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 mt-2 rounded" />
            </div>
          )}

          <div>
            <label>பாலினம் / Gender</label>
            <select name="gender" value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 mt-2 rounded" required>
              <option value="" disabled>பாலினத்தை தேர்வு செய்யவும் / Select Gender</option>
              <option value="male">ஆண் / Male</option>
              <option value="female">பெண் / Female</option>
              <option value="transgender">திருநங்கை / Transgender</option>
            </select>
          </div>

          <div>
            <label>தொலைபேசி எண் / Phone Number</label>
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
