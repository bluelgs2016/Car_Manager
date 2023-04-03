import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledErrorCode = styled.div`
    width: 399px;
    height: 266px;
    left: 761px;
    top: 248px;

    font-family: "VITRO CORE OTF";
    font-style: normal;
    font-weight: 900;
    font-size: 200px;
    line-height: 266px;
    /* identical to box height */

    text-align: center;

    /* Neutral/13 */
    
    color: #000000;
    `;

const StyledErrorMessage = styled.div`
    width: 404px;
    height: 64px;
    left: 758px;
    top: 514px;
    
    font-family: "VITRO CORE OTF";
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    line-height: 64px;
    /* identical to box height */
    
    text-align: center;
    letter-spacing: -0.06em;
    
    color: #57bdaa;
  `;
  const StyledMessage = styled.div`
    width: 404px;
    height: 56px;
    left: 758px;
    top: 656px;
    
    font-family: "Roboto";
    font-weight: 100;
    font-style: normal;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
    
    text-align: center;
    
    color: #000000;
    `;

function ErrorPage() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <StyledErrorCode>404</StyledErrorCode>
      <StyledErrorMessage>PAGE NOT FOUND!</StyledErrorMessage>
      <div style={{ height: "50px" }}></div>
      <StyledMessage>
        해당 페이지를 찾을 수 없습니다.
        <br />
        <span style={{ fontWeight: "500" }}>
          아래 버튼을 눌러 로그인 페이지로 이동
        </span>
        해 주세요.
      </StyledMessage>
      <div style={{ height: "50px" }} />
      <Link to="/">
        <button>로그인 페이지로 이동</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
