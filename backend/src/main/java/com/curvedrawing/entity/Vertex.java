package com.curvedrawing.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "vertices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vertex {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curve_id", nullable = false)
    @JsonIgnore
    private Curve curve;

    @Column(nullable = false)
    private Integer x;

    @Column(nullable = false)
    private Integer y;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}
