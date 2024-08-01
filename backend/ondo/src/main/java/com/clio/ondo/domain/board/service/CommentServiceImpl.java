package com.clio.ondo.domain.board.service;

import com.clio.ondo.domain.board.model.Board;
import com.clio.ondo.domain.board.model.Comment;
import com.clio.ondo.domain.board.repository.CommentRepository;
import com.clio.ondo.domain.board.repository.CustomCommentRepositoryImpl;
import java.util.List;
import java.util.Optional;

import com.clio.ondo.global.exception.member.NotFoundException;
import com.clio.ondo.global.exception.member.UnauthorizedException;
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
  public void deleteComment(ObjectId commentId,Long memberId) {
    Optional<Comment> existingCommentOpt = commentRepository.findById(commentId);

    //존재하는 댓글일 때
    if(existingCommentOpt.isPresent()){
      Comment existingComment = existingCommentOpt.get();
      if(existingComment.getMember_id().equals(memberId.toString())){
        commentRepository.deleteById(commentId);
      }
      else{
        //소유주가 아니기에 예외처리
        throw new UnauthorizedException("잘못된 접근입니다.");
      }
    } else {
      // 게시글이 존재하지 않을 경우 예외 처리
      throw new NotFoundException("존재하지 않은 댓글입니다.");
    }
    commentRepository.deleteById(commentId);
  }

  @Override
  public void updateComment(ObjectId commentId, Comment modifiedComment,Long memberId) {
    Optional<Comment> existingCommentOpt = commentRepository.findById(commentId);

    //존재하는 댓글일 때
    if(existingCommentOpt.isPresent()){
      Comment existingComment = existingCommentOpt.get();
      if(existingComment.getMember_id().equals(memberId.toString())){
        customCommentRepositoryImpl.updateComment(commentId,modifiedComment);
      }
      else{
        //소유주가 아니기에 예외처리
        throw new UnauthorizedException("잘못된 접근입니다.");
      }
    } else {
      // 게시글이 존재하지 않을 경우 예외 처리
      throw new NotFoundException("존재하지 않은 댓글입니다.");
    }
  }

  @Override
  public Page<Comment> getComments(Pageable pageble){
    return commentRepository.findAll(pageble);
  }

}