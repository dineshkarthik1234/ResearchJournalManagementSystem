package com.example.demo.controller;

import com.example.demo.service.ReviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reviewer")
public class ReviewerController {
    @Autowired
    private ReviewerService reviewerService;

    @PostMapping("/assignPaper/{paperId}/{reviewerId}")
    public ResponseEntity<Void> assignPaper(@PathVariable Long paperId, @PathVariable Long reviewerId) {
        reviewerService.assignPaperToReviewer(paperId, reviewerId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/finalizePaper/{paperId}")
    public ResponseEntity<Void> finalizePaper(@PathVariable Long paperId) {
        reviewerService.finalizePaper(paperId);
        return ResponseEntity.ok().build();
    }
}