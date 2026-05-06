package com.curvedrawing.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VertexDTO {
    private Long id;
    private Integer x;
    private Integer y;
    private Integer orderIndex;
}
