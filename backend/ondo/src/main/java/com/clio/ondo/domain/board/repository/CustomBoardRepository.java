package com.clio.ondo.domain.board.repository;

import com.clio.ondo.domain.board.model.Board;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomBoardRepository  {

  void updateArticle(ObjectId articleId, Board modifiedArticle);
}
