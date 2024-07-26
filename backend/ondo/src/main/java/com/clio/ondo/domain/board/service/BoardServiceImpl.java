package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.repository.BoardRepository;
import com.clio.ondo.domain.board.repository.CustomBoardRepository;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class BoardServiceImpl implements BoardService {


  @Autowired
  CustomBoardRepository customBoardRepositoryImpl;
  @Autowired
  BoardRepository boardRepository;

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
    return boardRepository.findAll(pageble);
  }

  public Board saveArticle(Board board) {
    return boardRepository.save(board);
  }

  /*
  게시글 삭제
   */
  public void deleteArticle(ObjectId articleId) {
    boardRepository.deleteById(articleId);
  }

  public void updateArticle(ObjectId articleId, Board modifiedArticle) {
    customBoardRepositoryImpl.updateArticle(articleId,modifiedArticle);
  }

  public Optional<Board> getArticle(ObjectId articleId) {
    return boardRepository.findById(articleId);
  }

}


