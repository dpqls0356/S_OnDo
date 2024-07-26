package com.clio.ondo.domain.board.controller;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.model.Comment;
import com.clio.ondo.domain.board.service.CommentServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@Slf4j
public class CommentController {

  @Autowired
  CommentServiceImpl commentServiceImpl;

    /*
        댓글 불러오기
     */

  /*
      댓글 작성하기
  */
  @PostMapping("/comment")
  public ResponseEntity<Void> createComment(@RequestBody Comment comment) {
    commentServiceImpl.saveComment(comment);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /*
      댓글 삭제
 */
  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable ObjectId commentId) {
    commentServiceImpl.deleteComment(commentId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  /*
      댓글 수정
*/
  @PatchMapping("/{commentId}")

  public ResponseEntity<Void> updateComment(@PathVariable ObjectId commentId, @RequestBody Board modifiedCommentId) {
    commentServiceImpl.upadteComment(commentId,modifiedCommentId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }


}