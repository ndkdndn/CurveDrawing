package com.curvedrawing.service;

import com.curvedrawing.dto.CurveDTO;
import java.util.List;

public interface CurveService {
    List<CurveDTO> getAllCurves();
    CurveDTO getCurveById(Long id);
    CurveDTO createCurve(CurveDTO curveDTO);
    CurveDTO updateCurve(Long id, CurveDTO curveDTO);
    void deleteCurve(Long id);
}
