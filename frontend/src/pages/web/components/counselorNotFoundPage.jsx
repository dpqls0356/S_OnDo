import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/app/AuthStore";
import IncorrectAccessModal from "./incorrectAccessModal";

export default function CounselorNotFoundPage() {
  const checkLoggedIn = useAuthStore((state) => state.checkLoggedIn);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = async () => {
    setIsModalOpen(false);
    const loggedIn = await checkLoggedIn();
    if (!loggedIn) {
      navigate("/counselor/login");
    } else {
      navigate("/counselor");
    }
  };
  return <IncorrectAccessModal isOpen={isModalOpen} closeModal={closeModal} />;
}
