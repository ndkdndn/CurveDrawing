package com.curvedrawing.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurveDTO {
    private Long id;
    private String name;
    private List<VertexDTO> vertices;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
