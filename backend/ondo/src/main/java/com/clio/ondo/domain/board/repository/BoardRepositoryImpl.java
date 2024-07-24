package com.clio.ondo.domain.board.repository;
import com.clio.ondo.domain.board.model.Board;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BoardRepositoryImpl extends MongoRepository<Board, String> {
}