package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;

import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface BoardService {

  //    public List<Board> getAricles();

  public Page<Board> getArticles(Pageable pageble);

  Board saveArticle(Board board);

  void deleteArticle(ObjectId articleId,Long   memberId);

  void updateArticle(String articleId, Board modifiedArticle, Long memberId);

  Optional<Board> getArticle(ObjectId articleId);

  public List<Board> searchArticles(String searchWord) ;

}

