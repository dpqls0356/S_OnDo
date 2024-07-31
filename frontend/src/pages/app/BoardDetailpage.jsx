import './BoardDetailpage.css'

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import CommentList from '../../components/app/CommentList'
import Footer from "../../components/app/Footer"
import Button from "../../components/app/Button"

import calendar from './../../assets/images/calendar.png'
import profile from './../../assets/images/test.png'
import commentbtn from './../../assets/images/edit-2.png'

const BoardDetailpage = () => {
  const comment = useRef(null)
  const onClickCreateComment = () => {
    console.log(comment.current.value)
  }

  const nav = useNavigate()
  const onClickUpdate = () => {
    nav('/board/게시글 아이디/update')
  }
  return(
    <>
      {/* 게시글 */}
      <div className="BoardDetail">
        <div className='DetailTitle'>
          <p id='boardtitle'>제목</p>
          <div>
            <Button onClick={onClickUpdate} text={'수정'} />
          </div>
        </div>

        <div className='DetailDate'>
          <div className='DetailUserInfo'>
            <img src={profile} />
            <p>작성자</p>
          </div>
          <div className='DetailCreate'>
            <img src={calendar} />
            <div>
            <p>20xx.xx.xx</p>
            <p>00:00</p>

            </div>
          </div>
        </div>
        
        <div className='DetailContent'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non diam a ipsum at aliquam. Ac sed pulvinar nisl interdum enim ut. In accumsan libero sed consectetur lobortis senectus non odio.</p>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className='CommentList'>
        <div id='comment-line'></div>
        <div className='CmtList' id='CommentScroll'>
          <CommentList />
        </div>
      </div>
      {/* 댓글 작성 */}
      <form className='CommentForm'>
        <textarea ref={comment} maxLength={100} name="" id="" placeholder='댓글을 달아보세요.' ></textarea>
        <img onClick={onClickCreateComment} src={commentbtn} style={{cursor: 'pointer'}}/>
      </form>

      <Footer />
    </>
  )
}

export default BoardDetailpage