import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfo from "components/main/UserInfo";
import ErrorPage from "../components/ErrorPage";
import DashBoard from "components/main/Dashboard";
import MainPage from "components/MainPage";
import Default from "components/main/Default";
import AdminSetting from "components/main/admin_setting/AdminSetting";
import AdminManage from "components/main/admin_manage/AdminManage";
import LanguageSetting from "components/main/system_manage/LanguageSetting";
import GeneralSetting from "components/main/system_manage/GeneralSetting";
import ContentSettingCode from "components/main/contents/ContentSettingCode";
import ContentSettingStructure from "components/main/contents/ContentSettingStructure";
import BugListManage from "components/main/contents/BugListManage";
import SentenceManage from "components/main/contents/SentenceManage";
import DifficultWord from "components/main/contents/DifficultWord";
import AbbreviatedWords from "components/main/contents/AbbreviatedWords";

const Main = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.mainReducer.authState);
  const userInfo = useSelector(state=>state.mainReducer.userInfo)

  useEffect(() => {
    if (!authState) {
      navigate("/login");
    }
  }, [authState, navigate]);

  return (
    <div className="mainContainer">
      {/* <GlobalHeader /> */}
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Default />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="admin_setting" element={<AdminSetting />} />
          <Route path="admin_manage" element={<AdminManage />} />
          <Route path="language_setting" element={<LanguageSetting />} />
          <Route path="system_setting" element={<GeneralSetting />} />
          <Route path="content_setting_code" element={<ContentSettingCode />} />
          <Route path="content_setting_structure" element={<ContentSettingStructure />} />
          <Route path="bug_list_manage" element={<BugListManage />} />
          <Route path="sentence_manage" element={<SentenceManage />} />
          <Route path="abbreviated_words" element={<AbbreviatedWords />} />
          <Route path="difficult_word" element={<DifficultWord />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Main;
