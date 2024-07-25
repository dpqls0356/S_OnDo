package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.repository.BoardRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BoardService implements BoardServiceImpl {


  @Autowired
  BoardRepositoryImpl boardRepositoryImpl;

    /*
    모든 게시글 가져오기
     */
//  public List<Board> getAricles() {
//    List<Board> articles=boardRepositoryImpl.findAll();
//    return articles;
//  }


  /*
  모든 게시글 가져오기 - 무한 스크롤 기능
   */
  public Page<Board> getArticles(Pageable pageble){
    return boardRepositoryImpl.findAll(pageble);
  }

  @Override
  public Board saveArticle(Board board) {
    return boardRepositoryImpl.save(board);
  }
}

