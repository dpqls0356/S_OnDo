import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const View = styled.div`
    padding: 0px 20px 10px 20px;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
` 

const UserProfile = styled.div`
    padding:30px 0px;
    display: flex;
`

const Col = styled.div`
    
    &:nth-child(1){ //profile img
        width: 30%;
        height: 100%;
        & > div{
            width:100%;
            height:100%;
        }
    }
    &:nth-child(2){ //user info - text
        margin-left: 20px;
        &>div:nth-child(1){ //name 
            font-size: 30px;
            font-weight: 800;
        }
    }

`

const History = styled.div`
    flex: 1;
    background-color: white;
    padding:0px 30px 20px 30px;
    border-radius: 5%;
    border: 2px solid black;
    overflow-y:scroll ;
    div:last-child{
        border: none;
    }
`

const CounselingMemo = styled.div`
    border-bottom: 2px solid black;
    padding: 20px 0px;
    &>p:nth-child(1){
        font-size:20px;
        font-weight: 800;
    }
    .memo{
        background-color: #fae6e6;
        padding:10px 20px;
        border-radius:10px;
        width: 100%;
        textarea{
           width:100%;
            background-color: inherit;
        }
        &>div:nth-child(2){
            display:flex;
            justify-content: flex-end;
            button{
                height: fit-content;
                width: fit-content;
                color:gray;
                font-size: 15px;
                background-color: inherit;
                padding: 0px;
            }
        }
    }
    
`
export default function UserInfoComponent(){
    return <View>
        <UserProfile>
        <Col>
        {/* 프로필 사진 여부따라서  */}
            {false?  
            <div>
                <img></img>
            </div>:
            <div style={{padding:"20px 10px", border:"2px solid black",backgroundColor:"white"}}>
                <FontAwesomeIcon style={{width:"100%", height:"100%",}} icon={faUser} />
            </div>
        }
        </Col>
        <Col>
            <div>정싸피</div>
            <div>
                <div>생년월일: 1998.07.11</div>
                <div>성별: 여</div>
                <div>은둔 기간: 2019.05 ~ </div>
            </div>
        </Col>
        </UserProfile>
        <History>
            <CounselingMemo>
            <p>2024.01.23</p>
            <p>상담하고 싶어요...</p>
            <div className="memo">
                <div>
                    <textarea>가족 관계: 부, 모, 동생
                    밖에만 나가면 모든 사람들이 주목하는 것 같아 밖에 나가기 두려워함.</textarea>
                </div>
                <div>
                    <button>수정</button>
                </div>
            </div>
            </CounselingMemo>
            <CounselingMemo>
            <p>2024.01.23</p>
            <p>상담하고 싶어요...</p>
            <div className="memo">
                <div>
                    <textarea>가족 관계: 부, 모, 동생
                    밖에만 나가면 모든 사람들이 주목하는 것 같아 밖에 나가기 두려워함.</textarea>
                </div>
                <div>
                    <button>수정</button>
                </div>
            </div>
            </CounselingMemo>
            <CounselingMemo>
            <p>2024.01.23</p>
            <p>상담하고 싶어요...</p>
            <div className="memo">
                <div>
                    <textarea>가족 관계: 부, 모, 동생
                    밖에만 나가면 모든 사람들이 주목하는 것 같아 밖에 나가기 두려워함.</textarea>
                </div>
                <div>
                    <button>수정</button>
                </div>
            </div>
            </CounselingMemo>
        </History>
    </View>
}