// 게시글 리스트
import './BoardList.css'

import Board from './Board'

const BoardList = () => {
  return (
    // for문 돌리듯이 돌려서 Board 뿌리게 하기
    <>
      <div>
        <Board />
      </div>
    </>
  )
}

export default BoardList;