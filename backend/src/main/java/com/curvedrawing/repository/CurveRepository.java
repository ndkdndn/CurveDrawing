package com.curvedrawing.repository;

import com.curvedrawing.entity.Curve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurveRepository extends JpaRepository<Curve, Long> {
}
