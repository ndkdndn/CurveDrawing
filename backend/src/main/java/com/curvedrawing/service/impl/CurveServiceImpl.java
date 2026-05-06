package com.curvedrawing.service.impl;

import com.curvedrawing.dto.CurveDTO;
import com.curvedrawing.dto.VertexDTO;
import com.curvedrawing.entity.Curve;
import com.curvedrawing.entity.Vertex;
import com.curvedrawing.repository.CurveRepository;
import com.curvedrawing.service.CurveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CurveServiceImpl implements CurveService {

    @Autowired
    private CurveRepository curveRepository;

    @Override
    public List<CurveDTO> getAllCurves() {
        return curveRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CurveDTO getCurveById(Long id) {
        return curveRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Curve not found with id: " + id));
    }

    @Override
    @Transactional
    public CurveDTO createCurve(CurveDTO curveDTO) {
        Curve curve = new Curve();
        curve.setName(curveDTO.getName() != null ? curveDTO.getName() : "Unnamed Curve");
        
        if (curveDTO.getVertices() != null) {
            for (int i = 0; i < curveDTO.getVertices().size(); i++) {
                VertexDTO vDto = curveDTO.getVertices().get(i);
                Vertex vertex = new Vertex();
                vertex.setX(vDto.getX());
                vertex.setY(vDto.getY());
                vertex.setOrderIndex(vDto.getOrderIndex() != null ? vDto.getOrderIndex() : i);
                curve.addVertex(vertex);
            }
        }
        
        Curve savedCurve = curveRepository.save(curve);
        return convertToDTO(savedCurve);
    }

    @Override
    @Transactional
    public CurveDTO updateCurve(Long id, CurveDTO curveDTO) {
        Curve curve = curveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curve not found with id: " + id));
        
        if (curveDTO.getName() != null) {
            curve.setName(curveDTO.getName());
        }
        
        // Clear existing and add new vertices
        curve.getVertices().clear();
        
        if (curveDTO.getVertices() != null) {
            for (int i = 0; i < curveDTO.getVertices().size(); i++) {
                VertexDTO vDto = curveDTO.getVertices().get(i);
                Vertex vertex = new Vertex();
                vertex.setX(vDto.getX());
                vertex.setY(vDto.getY());
                vertex.setOrderIndex(vDto.getOrderIndex() != null ? vDto.getOrderIndex() : i);
                curve.addVertex(vertex);
            }
        }
        
        Curve updatedCurve = curveRepository.save(curve);
        return convertToDTO(updatedCurve);
    }

    @Override
    @Transactional
    public void deleteCurve(Long id) {
        if (!curveRepository.existsById(id)) {
            throw new RuntimeException("Curve not found with id: " + id);
        }
        curveRepository.deleteById(id);
    }

    private CurveDTO convertToDTO(Curve curve) {
        CurveDTO dto = new CurveDTO();
        dto.setId(curve.getId());
        dto.setName(curve.getName());
        dto.setCreatedAt(curve.getCreatedAt());
        dto.setUpdatedAt(curve.getUpdatedAt());
        
        if (curve.getVertices() != null) {
            List<VertexDTO> vertexDTOs = curve.getVertices().stream()
                    .map(v -> new VertexDTO(v.getId(), v.getX(), v.getY(), v.getOrderIndex()))
                    .collect(Collectors.toList());
            dto.setVertices(vertexDTOs);
        } else {
            dto.setVertices(new ArrayList<>());
        }
        
        return dto;
    }
}
