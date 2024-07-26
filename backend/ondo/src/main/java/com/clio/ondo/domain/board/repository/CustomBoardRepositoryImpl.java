package com.clio.ondo.domain.board.repository;
import com.clio.ondo.domain.board.model.Board;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

//Board 도메인 객체를 처리할 때 ID를 ObjectId로 처리
@Component
public class CustomBoardRepositoryImpl implements CustomBoardRepository{

  @Autowired
  private MongoTemplate mongoTemplate;

  public void updateArticle(ObjectId articleId, Board modifiedArticle) {
    //id로 데이터 받아와서 modifiedArticle의 값이 null아닌 경우 setter사용해 값을 바꾸고 그걸 savs
    /*
    1. 어떠한 값도 바뀌지않은 경우
    2. 관련 게시글이 없을 경우
     */
    Board existingArticle = mongoTemplate.findById(articleId, Board.class);
    if (existingArticle != null) {
      if (modifiedArticle.getTitle() != null) {
        existingArticle.setTitle(modifiedArticle.getTitle());
      }
      if (modifiedArticle.getContent() != null) {
        existingArticle.setContent(modifiedArticle.getContent());
      }
      // 수정된 게시글 저장
      mongoTemplate.save(existingArticle);
    } else {
      // 게시글이 존재하지 않을 경우 예외 처리
    }
  }
}