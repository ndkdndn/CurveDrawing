package com.curvedrawing.controller;

import com.curvedrawing.dto.CurveDTO;
import com.curvedrawing.service.CurveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/curves")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CurveController {

    @Autowired
    private CurveService curveService;

    @GetMapping
    public ResponseEntity<List<CurveDTO>> getAllCurves() {
        return ResponseEntity.ok(curveService.getAllCurves());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CurveDTO> getCurveById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(curveService.getCurveById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CurveDTO> createCurve(@RequestBody CurveDTO curveDTO) {
        return new ResponseEntity<>(curveService.createCurve(curveDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CurveDTO> updateCurve(@PathVariable Long id, @RequestBody CurveDTO curveDTO) {
        try {
            return ResponseEntity.ok(curveService.updateCurve(id, curveDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurve(@PathVariable Long id) {
        try {
            curveService.deleteCurve(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
