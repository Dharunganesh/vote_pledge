import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { supabase } from '../supabaseClient'

const CERTIFICATE_API_URL = import.meta.env.VITE_CERTIFICATE_API_URL

const PANCHAYATS = {
  Arakkonam: [
    "AMBARISHIPURAM",
    "AMMANOOR",
    "ANAIKATAPUTHUR",
    "ANAIPAKKAM",
    "ANANTHAPURAM",
    "ANWARTHIGANPET",
    "ASAMANDUR",
    "AUTHUR",
    "CHITHAMBADI",
    "ITCHIPUTHUR",
    "KAINOOR",
    "KAVANOOR",
    "KILANDUR",
    "KILAVANAM",
    "KILKUPPAM",
    "KILPAKKAM",
    "KONALAM",
    "KRISHNAPURAM",
    "MELPAKKAM",
    "MINNAL",
    "MITTAPET",
    "MOSUR",
    "MUDUR",
    "MULVOY",
    "NAGARIKUPPAM",
    "NANDIVEDUTHANGAL",
    "PARANCHI",
    "PERUMALRAJAPET",
    "PERUMUCHI",
    "PERUNGALATHUR",
    "PUDUKESAVARAM",
    "PULIYAMANGALAM",
    "SEMBEDU",
    "SEYYUR",
    "THANDALAM",
    "THANIGAIPOLUR",
    "ULIYAMBAKKAM",
    "URIYUR",
    "VADAMAMBAKKAM",
    "VALARPURAM",
    "VEDAL",
    "VELUR"
  ],
  Arcot: [
    "ANATHANGAL",
    "ARAPAKKAM",
    "ARUMBAKKAM",
    "ARUNGUNDRAM",
    "ATHITHANGAL",
    "AYILAM",
    "DASIPURAM",
    "ESAYANUR",
    "KARIKANTHANGAL",
    "KARIVEDU",
    "KATHIYAVADI",
    "KILAMBADI",
    "KILKUPPAM",
    "KILMINNAL",
    "KIRAMBADI",
    "KOORAMBADI",
    "KUKKUNDI",
    "LADAVARAM",
    "MANGADU",
    "MECHERI",
    "MELAKUPPAM",
    "MULLUVADI",
    "MUPPATHUVETTI",
    "NANDHIYALAM",
    "PAPPERI",
    "PUDERI",
    "PUDUPADI",
    "PUNNAPADI",
    "PUTTUTHAKKU",
    "SAKKARAMALLUR",
    "SAMBASIVAPURAM",
    "SARVANTHANGAL",
    "SATHUR",
    "SEMBEDU",
    "THALANUR",
    "UPPUPETTAI",
    "VALAVANOOR",
    "VELUR",
    "VEPOOR"
  ],
  Kaveripakkam: [
    "ALAPAKKAM",
    "ATHIPATTU",
    "AVALOOR",
    "AYARPADI",
    "BANAVARAM",
    "CHERI",
    "DHARMANEETHI",
    "ERALACHERI",
    "KALATHUR",
    "KARIVEDU",
    "KARNAVOUR",
    "KATTALAI",
    "KILVEERANAM",
    "KOOTHAMPAKKAM",
    "MAGANIPATTU",
    "MAMANDUR",
    "MANGALAM",
    "OCHERI",
    "PANIYUR",
    "PERUMPULIPAKKAM",
    "PERUVALAYAM",
    "PUDUPATTU",
    "PUDUR",
    "SANKARAMPADI",
    "SIRUKARUMBUR",
    "SIRUVALAYAM",
    "THURAIPERUMBAKKAM",
    "UTHIRAMPATTU",
    "VEGAMANGALAM"
  ],
  Nemili: [
    "AGAVALAM",
    "ARIGILAPADI",
    "ARUMBAKKAM",
    "ASANALLIKUPPAM",
    "ATTUPAKKAM",
    "CHITHERI",
    "CHITTOOR",
    "ELATHUR",
    "GANAPATHIPURAM",
    "ILLUPAITHANDALAM",
    "JAGIRTHANDALAM",
    "KATTUPAKKAM",
    "KILANDURAI",
    "KILKALATHUR",
    "KILVEEDHI",
    "KILVENBAKKAM",
    "KILVENKATAPURAM",
    "KODAMBAKKAM",
    "MAHENDIRAVADI",
    "MANGATTUCHERI",
    "MELANDURAI",
    "MELAPULAM",
    "MELERI",
    "MELKALATHUR",
    "MURUNGAI",
    "NAGAVEDU",
    "NEDUMBULI",
    "NELVOY",
    "OCHALAM",
    "PALLUR",
    "PARAMESWARAMANGALAM",
    "PARATHIPUTHUR",
    "PERAPPERI",
    "PINNAVARAM",
    "POIGAINALLUR",
    "REDDIVALAM",
    "SAYANAPURAM",
    "SELVAMANDAI",
    "SIRUNAMALLI",
    "THIRUMADALAMBAKKAM",
    "THIRUMALPUR",
    "THURAIYUR",
    "ULIYANALLORE",
    "VELITHANGIPURAM",
    "VELIYANALLORE",
    "VEPPERI",
    "VETTANGULAM"
  ],
  Sholinghur: [
    "AKKACHIKUPPAM",
    "AYAL",
    "AYPEDU",
    "GOODALUR",
    "GOVINDACHERI",
    "GOVINDACHERIKUPPAM",
    "JAMBUKULAM",
    "KADAPANTHANGAL",
    "KALLALANKUPPAM",
    "KARADIKUPPAM",
    "KARIKKAL",
    "KATTRAMPAKKAM",
    "KESAVANANKUPPAM",
    "KODAKKAL",
    "KOLATHERI",
    "KUNNATHUR",
    "MARUDHALAM",
    "MEELVEERANAM",
    "NANDIMANGALAM",
    "OZHUGUR",
    "PALAYAPALAYAM",
    "PANDIYANELLORE",
    "PARAVATHUR",
    "POLIPAKKAM",
    "PONNAPPANTHANGAL",
    "PULIVALAM",
    "RENDADI",
    "SEKKADIKUPPAM",
    "SENGALNATHAM",
    "SOMASUNDARAM",
    "SOORAI",
    "THAGARAKUPPAM",
    "THALANGAI",
    "THALIKKAL",
    "THAPPOUR",
    "VALLIAMBADI",
    "VANGHUR",
    "VELAM",
    "VENGUPATTU",
    "VENKATAPURAM"
  ],
  Thimiri: [
    "AGARAM",
    "ALLALACHERI",
    "ANAIMALLUR",
    "AROOR",
    "ATHIYANAM",
    "AYIRAMANGALAM",
    "DAMARAPAKKAM",
    "DONIMEDU",
    "DURGAM",
    "GUNDALERI",
    "IRUNGUR",
    "KALAVAIPUTHUR",
    "KANIYANUR",
    "KAVANUR",
    "KUPPAM",
    "KUPPIDISATHAM",
    "KUTHIYAM",
    "MAMBAKKAM",
    "MANTHANGAL",
    "MAZHAIYUR",
    "MELAPALANTHAI",
    "MELATHANGAL",
    "MELNAICKENPALAYAM",
    "MELNELLI",
    "MELNETHAPAKKAM",
    "MOSUR",
    "NAGALERI",
    "NALLUR",
    "NAMBARAI",
    "PALAYAM",
    "PALAYANUR",
    "PALI",
    "PARADARAMI",
    "PARIAMANGALAM",
    "PARIKKALPATTU",
    "PATTANAM",
    "PENNAGAR",
    "PERUMANTHANGAL",
    "PINNATHANGAL",
    "PUDUPAKKAM",
    "PUDUR",
    "PUNGANUR",
    "SENGANAVARAM",
    "SENNASAMUDRAM",
    "SEYYATHUVANNAN",
    "SITTANTHANGAL",
    "SOARAIYUR",
    "VALAIYATHUR",
    "VALAPANDAL",
    "VANAKKAMBADI",
    "VARAGHUR",
    "VELLAMBI",
    "VEMBI",
    "VENKATAPURAM",
    "VILARI"
  ],
  Walajah: [
    "ANANDALAI",
    "BAGAVELI",
    "CHENNASAMUDRAM",
    "CHETTITHANGAL",
    "EKAMBARANALLORE",
    "GUDIMALLUR",
    "KADAPPERI",
    "KALMELKUPPAM",
    "KATHARIKUPPAM",
    "KONDAKUPPAM",
    "LALAPET",
    "MANIYAMBATTU",
    "MANTHANGAL",
    "MARUDAMBAKKAM",
    "MOTTUR",
    "MUKUNDARAYAPURAM",
    "MUSIRI",
    "NARASINGAPURAM",
    "NOWLOCK",
    "PADIYAMBAKKAM",
    "PALLERI",
    "POONDI",
    "SATHAMBAKKAM",
    "SEEKARAJAPURAM",
    "SENGADU",
    "SUMAITHANGI",
    "THAGARAKUPPAM",
    "THENGAL",
    "THENKADAPPANTHANGAL",
    "THIRUMALAICHERI",
    "THIRUPARKADAL",
    "V.C. MOTTUR",
    "VALLUVAMBAKKAM",
    "VANAPADY",
    "VANNIVEDU",
    "VASUR"
  ]
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
  panchayat: '' // added
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

      if (CERTIFICATE_API_URL && formData.name?.trim()) {
        fetch(`${CERTIFICATE_API_URL}/pledge`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name.trim() }),
        }).catch((bgError) => {
          console.error("Background pledge request failed:", bgError)
        })
      }

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

  // get panchayats based on selected block
  const panchayatOptions = PANCHAYATS[formData.block] || []

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
            உங்கள் விவரங்களை சமர்ப்பிக்கவும் <br />
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
                <input name="name" value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பிறந்த தேதி / Date of Birth</label>
                <input type="date" name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">வயது / Age</label>
                <input value={age} readOnly className="w-full bg-gray-200 p-3 sm:p-4 rounded-xl mt-2" />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">மாவட்டம் / District</label>
                <div className="bg-gray-200 p-3 sm:p-4 rounded-xl mt-2 font-bold">
                  Ranipet
                </div>
              </div>

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
                      <option>Sholinghur</option>
                      <option>Thimiri</option>
                      <option>Walajah</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பஞ்சாயத்து / Panchayat</label>
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
                </>
              )}

              {formData.area_type === 'urban' && (
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-[#001d44]">நகராட்சி / ULB</label>
                  <select name="ulb" value={formData.ulb}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                    <option value="" disabled>Select ULB</option>
                    <option>Ammoor TP</option>
                    <option>Kalavai TP</option>
                    <option>Kaveripakkam TP</option>
                    <option>Nemili TP</option>
                    <option>Panapakkam TP</option>
                    <option>Thakkolam TP</option>
                    <option>Thimiri TP</option>
                    <option>Vilapakkam TP</option>
                    <option>Arakkonam MP</option>
                    <option>Arcot MP</option>
                    <option>Melvisharam MP</option>
                    <option>Ranipet MP</option>
                    <option>Sholinghur MP</option>
                    <option>Wallajah MP</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">சட்டமன்ற தொகுதி / Assembly Constituency</label>
                <select name="constituency" value={formData.constituency}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                  <option value="" disabled>Select Constituency</option>
                  <option>Arakkonam</option>
                  <option>Sholingur</option>
                  <option>Ranipet</option>
                  <option>Arcot</option>
                  <option>Katpadi</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">வகை / Category</label>
                <select name="category" value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                  <option value="" disabled>Select Category</option>
                  <option value="College/Institution">College/Institution</option>
                  <option value="General Public">General Public</option>
                  <option value="SHG Members">SHG Members</option>
                  <option value="Industries Employee">Industries Employee</option>
                  <option value="Government Employees">Government Employees</option>
                </select>
              </div>

              {formData.category === 'College/Institution' && (
                <>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-[#001d44]">கல்லூரி பெயர் / College Name</label>
                    <input
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-[#001d44]">
                      முதல் முறையாக வாக்களிப்பவரா? / First Time Voter?
                    </label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="first_time_voter"
                          value="yes"
                          checked={formData.first_time_voter === 'yes'}
                          onChange={handleChange}
                        />
                        ஆம் / Yes
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="first_time_voter"
                          value="no"
                          checked={formData.first_time_voter === 'no'}
                          onChange={handleChange}
                        />
                        இல்லை / No
                      </label>
                    </div>
                  </div>
                </>
              )}

              {formData.category === 'SHG Members' && (
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-[#001d44]">மகளிர் சுய உதவிக் குழு உறுப்பினர் எண் / SHG Member ID</label>
                  <input name="shg_number"
                    value={formData.shg_number}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" />
                </div>
              )}

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">பாலினம் / Gender</label>
                <select name="gender" value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required>
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-semibold text-[#001d44]">தொலைபேசி எண் / Phone Number</label>
                <input name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-3 sm:p-4 rounded-xl mt-2" required />
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
