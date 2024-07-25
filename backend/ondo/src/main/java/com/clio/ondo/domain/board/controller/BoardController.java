package com.clio.ondo.domain.board.controller;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/v1/board")
@Slf4j
public class BoardController {

  @Autowired
  private BoardService boardService;

  /*
  모든 게시글 가져오기 - 무한 스크롤 구현
  param
      page: 요청한 페이지 번호
      size: 페이지당 데이터 항목의 수 ( 0  ~ 데이터 수 / size -1 )
   */
  //ResponseEntity: pring의 HTTP 응답을 나타내는 클래스
  //Pageable: 데이터베이스 쿼리에서 페이징을 적용하는 데 사용
  @GetMapping("/list")
  public ResponseEntity<Page<Board>> getArticles(
      @RequestParam(name = "page", defaultValue = "0") int page,
      @RequestParam(name = "size", defaultValue = "10") int size)  {
    Pageable pageable = PageRequest.of(page, size);
    Page<Board> articles = boardService.getArticles(pageable);
    return ResponseEntity.ok(articles);
  }

  /*
  글 작성하기
   */
  @PostMapping("/article")
  public ResponseEntity<Void> createArticle(@RequestBody Board board) {
    boardService.saveArticle(board);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /*
게시글 삭제
 */
  @DeleteMapping("/{articleId}")
  public ResponseEntity<Void> deleteArticle(@PathVariable ObjectId articleId) {
    boardService.deleteArticle(articleId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  /*
게시글 수정
*/
  @PatchMapping("/{articleId}")

  public ResponseEntity<Void> updateArticle(@PathVariable ObjectId articleId, @RequestBody Board modifiedArticle) {
    boardService.upadteArticle(articleId,modifiedArticle);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  /*
  게시글 상세조회
   */
  @GetMapping("/{articleId}")
  public ResponseEntity<Optional<Board>> getArticle(@PathVariable ObjectId articleId){
    Optional<Board> article = boardService.getArticle(articleId);
    return ResponseEntity.ok(article);
  }



}
