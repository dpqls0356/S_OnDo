import './Comment.css'
import { useNavigate } from 'react-router-dom'

import profile from './../../../assets/images/test.png'

const Comment = () => {

  const nav = useNavigate()
  const onClickCommentDelete = () => {
    console.log('댓글 삭제 완료')
    nav('/member/board/게시글 아이디/comment 아이디')
  }

  return(
    <>
      <div className="CommentCard">
        <div className='CommentWriter'>
          <div>
            <img src={profile} />
            <p>댓글 작성자</p>
          </div>
          <p onClick={onClickCommentDelete} style={{cursor: 'pointer'}}>X</p>
        </div>
        <div className='CommentContent'>
          <p>내용</p>
          <p id='CommentCreateDate'>작성 시간</p>
        </div>
      </div>

      {/* -----아래는 나중에 지울 예정-------- */}
      {/* <div className="CommentCard">
        <div className='CommentWriter'>
          <div>
            <img src={profile} />
            <p>댓글 작성자</p>
          </div>
          <p onClick={onClickCommentDelete} style={{cursor: 'pointer'}}>X</p>
        </div>
        <div className='CommentContent'>
          <p>내용</p>
          <p id='CommentCreateDate'>작성 시간</p>
        </div>
      </div>
      <div className="CommentCard">
        <div className='CommentWriter'>
          <div>
            <img src={profile} />
            <p>댓글 작성자</p>
          </div>
          <p onClick={onClickCommentDelete} style={{cursor: 'pointer'}}>X</p>
        </div>
        <div className='CommentContent'>
          <p>내용</p>
          <p id='CommentCreateDate'>작성 시간</p>
        </div>
      </div>
      <div className="CommentCard">
        <div className='CommentWriter'>
          <div>
            <img src={profile} />
            <p>댓글 작성자</p>
          </div>
          <p onClick={onClickCommentDelete} style={{cursor: 'pointer'}}>X</p>
        </div>
        <div className='CommentContent'>
          <div id='CommentContent'>1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <p id='CommentCreateDate'>작성 시간</p>
        </div>
      </div> */}
    </>
  )
}

export default Comment