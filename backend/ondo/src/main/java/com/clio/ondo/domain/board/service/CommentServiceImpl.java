package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.model.Comment;
import com.clio.ondo.domain.board.repository.CommentRepository;
import com.clio.ondo.domain.board.repository.CustomCommentRepositoryImpl;
import java.util.List;
import java.util.Optional;

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
    Optional<Comment> existingCommentOpt = commentRepository.findById(commentId);

    //존재하는 댓글일 때
    if(existingCommentOpt.isPresent()){
      Comment existingComment = existingCommentOpt.get();
      if(existingComment.getMember_id().equals(existingComment.getMember_id())){
        commentRepository.deleteById(commentId);
      }
      //댓글 소유주가 아닐때
      else{

      }
    }
    //댓글이 존재하지 않을 때
    else{

    }
    commentRepository.deleteById(commentId);
  }

  @Override
  public void updateComment(ObjectId commentId, Comment modifiedComment) {
    Optional<Comment> existingCommentOpt = commentRepository.findById(commentId);

    //존재하는 댓글일 때
    if(existingCommentOpt.isPresent()){
      Comment existingComment = existingCommentOpt.get();
      if(existingComment.getMember_id().equals(existingComment.getMember_id())){
        customCommentRepositoryImpl.updateComment(commentId,modifiedComment);
      }
      //댓글 소유주가 아닐때
      else{

      }
    }
    //댓글이 존재하지 않을 때
    else{

    }
  }

  @Override
  public Page<Comment> getComments(Pageable pageble){
    return commentRepository.findAll(pageble);
  }

}