package com.clio.ondo.domain.board.model;

import jakarta.persistence.Id;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="comments")
@Setter
@Getter
public class Comment {
  @Id
  private ObjectId id; //식별자
  private String content; //내용
  private Date created_at;    //작성일
  private String member_id;   //작성자
  private String article_id;   //작성자


}