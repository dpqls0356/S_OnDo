package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.repository.BoardRepository;
import com.clio.ondo.domain.board.repository.CustomBoardRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BoardService implements BoardServiceImpl {


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

  @Override
  public Board saveArticle(Board board) {
    return boardRepository.save(board);
  }

  /*
  게시글 삭제
   */
  @Override
  public void deleteArticle(ObjectId articleId) {
    boardRepository.deleteById(articleId);
  }

  @Override
  public void upadteArticle(ObjectId articleId, Board modifiedArticle) {
    //오는 값이 비밀번호, 닉네임, 비밀번호 + 닉네임 일 수 있기에 어떻게 처리할까
    customBoardRepositoryImpl.updateArticle(articleId,modifiedArticle);
  }
}

