import { Link } from "react-router-dom"

function AuthPage () {

  return (
    <div>
        <div style={{margin:"20px", fontSize:"20px"}}>
            인증이 만료되었습니다. 다시 로그인 해주세요.
        </div>
        <Link to="/">
          <button style={{fontSize:"18px"}}>다시 로그인하러 가기</button>
        </Link>
    </div>
  )
}

export default AuthPage