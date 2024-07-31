// 게시글 리스트
import './BoardList.css'

import Board from './Board'

const BoardList = () => {
  return (
    // 게시글 리스트 불러와서 아래 컴포넌트 for문 돌려야함
    <>
      <div className='BoardScroll'>
        <Board />
      </div>
    </>
  )
}

export default BoardList;