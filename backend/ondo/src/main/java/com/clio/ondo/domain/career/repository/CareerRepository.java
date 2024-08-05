package com.clio.ondo.domain.career.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.clio.ondo.domain.career.model.Career;
import com.clio.ondo.domain.counselor.model.Counselor;

public interface CareerRepository extends JpaRepository<Career,Long> {
	Optional<Counselor> findByCounselorId(Long counselorId);
}
