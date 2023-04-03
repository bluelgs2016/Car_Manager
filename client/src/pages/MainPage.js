import { Link } from "react-router-dom"

function MainPage () {
  return (
    <div>
      <div>main페이지 입니다.</div>
      <br/><br/>
      <Link to="/">
        <button>로그인 페이지로 이동합니다.</button>
      </Link>
    </div>
  )
}

export default MainPage