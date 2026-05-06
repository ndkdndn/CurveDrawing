package com.curvedrawing.repository;

import com.curvedrawing.entity.Vertex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VertexRepository extends JpaRepository<Vertex, Long> {
}
