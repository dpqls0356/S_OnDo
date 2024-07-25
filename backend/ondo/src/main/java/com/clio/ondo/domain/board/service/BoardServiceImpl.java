package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardServiceImpl {
  //    public List<Board> getAricles();
  public Page<Board> getArticles(Pageable pageble);

  Board saveArticle(Board board);
}