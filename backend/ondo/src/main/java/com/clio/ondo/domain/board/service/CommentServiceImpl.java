package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.model.Comment;
import com.clio.ondo.domain.board.repository.CommentRepository;
import com.clio.ondo.domain.board.repository.CustomCommentRepositoryImpl;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  CommentRepository commentRepository;
  @Autowired
  CustomCommentRepositoryImpl customCommentRepositoryImpl;

  @Override
  public void saveComment(Comment comment) {
    commentRepository.save(comment);
  }

  @Override
  public void deleteComment(ObjectId commentId) {
    commentRepository.deleteById(commentId);
  }

  @Override
  public void updateComment(ObjectId commentId, Comment modifiedComment) {
    customCommentRepositoryImpl.updateComment(commentId,modifiedComment);
  }

  @Override
  public Page<Comment> getComments(Pageable pageble){
    return commentRepository.findAll(pageble);
  }

}