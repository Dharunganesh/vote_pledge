import { useNavigate } from "react-router-dom"
import Login from "../Pages/Login"
function LoginWrapper({ phoneNumber, setPhoneNumber }) {
    const navigate = useNavigate()

    const submitPhoneNumber = async () => {
        const regex = /[^0-9]/g

        if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
            alert("தயவுசெய்து சரியான மொபைல் எண்ணை உள்ளிடவும்")
            return
        }

        const phone = `+91${phoneNumber}`

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone })
            })

            localStorage.setItem("phone", phone)

            navigate('/otp')

        } catch (err) {
            alert("OTP அனுப்புவதில் பிழை ஏற்பட்டது")
            console.error(err)
        }
    }

    return (
        <Login
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            submitPhoneNumber={submitPhoneNumber}
        />
    )
}

export default LoginWrapper