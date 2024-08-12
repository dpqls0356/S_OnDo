import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/app/authStore";

const OAuthCallback = () => {
  const setAuthState = useAuthStore((state) => state.set);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 상태 업데이트
      setAuthState({
        accessToken,
        refreshToken,
        role: "USER", // 예시: OAuth2 로그인 사용자로 USER 역할을 설정
      });

      // 사용자 인증 정보 확인
      const checkAuth = async () => {
        const response = await fetch("/member/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          navigate("/member/home"); // 인증이 성공하면 홈으로 리디렉트
        } else {
          navigate("/login"); // 실패 시 로그인 페이지로 리디렉트
        }
      };

      checkAuth();
    } else {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉트
    }
  }, [navigate, setAuthState]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
