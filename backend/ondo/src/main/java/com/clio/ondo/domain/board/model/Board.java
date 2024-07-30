package com.clio.ondo.domain.board.model;

import jakarta.persistence.Id;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="articles")
@Getter
public class Board {
    @Id
    private ObjectId id; //식별자
    private String title;   //제목
    private String content; //내용
    private Date created_at;    //작성일
    private int views;  //조회수
    private String member_id;   //작성자
    // 제목을 바꾸는 메서드
    public void changeTitle(String newTitle) {
        this.title = newTitle;
    }

    // 내용을 바꾸는 메서드
    public void changeContent(String newContent) {
        this.content = newContent;
    }

}
