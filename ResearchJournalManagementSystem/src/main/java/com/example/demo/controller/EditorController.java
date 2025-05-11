package com.example.demo.controller;

import com.example.demo.model.PaperStatus;
import com.example.demo.service.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/editor")
public class EditorController {
    @Autowired
    private EditorService editorService;

    @PostMapping("/assignPaper/{paperId}/{editorId}")
    public ResponseEntity<Void> assignPaper(@PathVariable Long paperId, @PathVariable Long editorId) {
        editorService.assignPaperToEditor(paperId, editorId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/makeDecision/{paperId}")
    public ResponseEntity<Void> makeDecision(@PathVariable Long paperId, @RequestParam String decision) {
        PaperStatus status = PaperStatus.valueOf(decision.toUpperCase());
        editorService.makeDecision(paperId, status);
        return ResponseEntity.ok().build();
    }
}