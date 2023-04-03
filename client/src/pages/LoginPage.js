import axios from "axios"
import { Link } from "react-router-dom";

function Login () {
  const test = () => {
    axios.get("api/test")
    .then(res=>{
      console.log(res.data)
    })
  }
  return (
    <div>
      <div>로그인 페이지 입니다.</div>
      <br />
      <button onClick={test}>서버테스트 입니다.</button>
      <br /><br/>
      <Link to="/main">
        <button>메인페이지로 이동합니다.</button>
      </Link>
      <br /><br/>
      <Link to="/auth">
        <button>만료페이지로 이동합니다.</button>
      </Link>
      <br /><br/>
      <Link to="/ddd">
        <button>에러페이지로 이동합니다.</button>
      </Link>
    </div>
  )
}

export default Login