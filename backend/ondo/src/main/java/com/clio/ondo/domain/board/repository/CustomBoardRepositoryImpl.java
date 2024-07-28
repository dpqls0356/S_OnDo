package com.clio.ondo.domain.board.repository;
import com.clio.ondo.domain.board.model.Board;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;


//Board 도메인 객체를 처리할 때 ID를 ObjectId로 처리
@Component
public class CustomBoardRepositoryImpl implements CustomBoardRepository{

  @Autowired
  private MongoTemplate mongoTemplate;

  /*
  바뀐 데이터 파악해서 저장
   */
  @Override
  public void updateArticle(ObjectId articleId, Board modifiedArticle) {
    Board existingArticle = mongoTemplate.findById(articleId, Board.class);
      if (modifiedArticle.getTitle() != null) {
        existingArticle.changeTitle(modifiedArticle.getTitle());
      }
      if (modifiedArticle.getContent() != null) {
        existingArticle.changeContent(modifiedArticle.getContent());
      }
      // 수정된 게시글 저장
      mongoTemplate.save(existingArticle);
  }

  /*
  게시글 검색
  검색어가 들어간 작성자랑 제목일 경우 모든 글을 다 가져야함
   */
  @Override
  public List<Board> searchArticles(String searchWord) {
    Query query = new Query();
    query.addCriteria(new Criteria().orOperator(
            Criteria.where("author").regex(searchWord, "i"),
            Criteria.where("title").regex(searchWord, "i")
    ));
    return mongoTemplate.find(query, Board.class);
  }
}