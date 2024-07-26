package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface BoardService {

  //    public List<Board> getAricles();

  public Page<Board> getArticles(Pageable pageble);

  Board saveArticle(Board board);

  void deleteArticle(ObjectId articleId);

  void upadteArticle(ObjectId articleId, Board modifiedArticle);

  Optional<Board> getArticle(ObjectId articleId);
}

