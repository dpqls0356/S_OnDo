import React, { useImperativeHandle, forwardRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BoardList.css";
import useBoardStore from "../../../store/app/useBoardStore";
import Board from "./Board";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// api랑 맞추려고 게시글들은 boards, 단일 게시글은 article로
const BoardList = forwardRef((props, ref) => {
  const { boards, setSearchBoards, setBoards, pagination, updatePagination, toggleBoards } = useBoardStore();
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const updateBoard = async (text) => {
    try{
      // 입력이 비어있으면 전체 조회 해야됨
      if(text === ""){
        try {
          setIsLoading(true);
          const res = await api.get(
            `/board/list?page=${pagination.currentPage}&size=10`
          );
  
          // 응답 구조를 확인
          // console.log('API 응답:', res);
  
          if (res.data && res.data.data) {
            setBoards(res.data.data); // res.data.data를 전달
          } else {
            console.error("Unexpected API response structure:", res.data);
            setBoards({ boardList: { content: [] } });
          }
        } catch (error) {
          console.error("게시글 목록을 가져오는데 실패했습니다:", error);
          setBoards({ boardList: [] });
        } finally {
          setIsLoading(false);
        }

        return;
      }
      const response = await api.get(`/board/search?searchWord=`+ text);
      
      if(response.data && response.data.data){
        await setSearchBoards(response.data.data);
      }
      else{
        setSearchBoards({ boardList: { content: [] } });
      }
    }
    catch(error){
      console.log(error);
      setSearchBoards({ boardList: { content: [] } });
    }

  }

  const toggleSortBy = async () => {
    await toggleBoards();
  }

  useImperativeHandle(ref, () => ({
    trigerUpdateBoard: updateBoard,
    trigerToggleSortBy: toggleSortBy,
  }));

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(
          `/board/list?page=${pagination.currentPage}&size=10`
        );

        // 응답 구조를 확인
        // console.log('API 응답:', res);

        if (res.data && res.data.data) {
          setBoards(res.data.data); // res.data.data를 전달
        } else {
          console.error("Unexpected API response structure:", res.data);
          setBoards({ boardList: { content: [] } });
        }
      } catch (error) {
        console.error("게시글 목록을 가져오는데 실패했습니다:", error);
        setBoards({ boardList: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, [pagination.currentPage, setBoards]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="BoardList">
      {Array.isArray(boards) && boards.length > 0 ? (
        <>
          {boards.map((article) => (
            <Board key={article._id} article={article} />
          ))}
          <br />
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() =>
                updatePagination({
                  currentPage: Math.max(0, pagination.currentPage - 1),
                })
              }
              disabled={pagination.currentPage === 0}
            >
              {/* JSX에서 특수 문자를 처리하는 방법 */}
              &lt;
            </button>
            <span>
              페이지 {pagination.currentPage + 1} / {pagination.totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() =>
                updatePagination({
                  currentPage: Math.min(
                    pagination.totalPages - 1,
                    pagination.currentPage + 1
                  ),
                })
              }
              disabled={pagination.currentPage === pagination.totalPages - 1}
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        <p>게시글이 없습니다. (boards: {JSON.stringify(boards)})</p>
      )}
    </div>
  );
});
export default BoardList;
