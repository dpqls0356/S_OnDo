package com.clio.ondo.domain.board.model;

import jakarta.persistence.Id;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="comments")
@Getter
public class Comment {
  @Id
  private ObjectId id; //식별자
  private String content; //내용
  private Date created_at;    //작성일
  private String member_id;   //작성자
  private String member_name;
  private String article_id;
  // 내용을 바꾸는 메서드
  public void changeContent(String newContent) {
    this.content = newContent;
  }

  public void settingMemberId(String memberId){
    this.member_id = memberId;
  }

  //생성일 초기화 하는 함수
  public void settingCreatedDate(){
    this.created_at = new Date();
  }

}