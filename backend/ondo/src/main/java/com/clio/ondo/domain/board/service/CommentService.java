package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Comment;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
  public void saveComment(Comment comment);

  void deleteComment(ObjectId commentId);

  void updateComment(ObjectId commentId, Comment modifiedComment);

  public Page<Comment> getComments(Pageable pageble);
}