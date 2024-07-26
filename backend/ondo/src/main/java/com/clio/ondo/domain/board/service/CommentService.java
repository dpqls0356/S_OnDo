package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.model.Comment;
import org.bson.types.ObjectId;

public interface CommentService {
  public void saveComment(Comment comment);

  void deleteComment(ObjectId commentId);

  void upadteComment(ObjectId commentId, Board modifiedCommentId);
}