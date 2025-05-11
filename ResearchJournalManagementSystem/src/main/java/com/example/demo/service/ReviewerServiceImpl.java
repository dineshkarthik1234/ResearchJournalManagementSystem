package com.example.demo.service;

import com.example.demo.model.Paper;
import com.example.demo.model.PaperStatus;
import com.example.demo.model.Reviewer;
import com.example.demo.repository.PaperRepository;
import com.example.demo.repository.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewerServiceImpl implements ReviewerService {
    @Autowired
    private ReviewerRepository reviewerRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Override
    public void assignPaperToReviewer(Long paperId, Long reviewerId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found"));
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));
        paper.setReviewer(reviewer);
        paper.setStatus(PaperStatus.ASSIGNED_TO_REVIEWER);
        paperRepository.save(paper);
    }

    @Override
    public void finalizePaper(Long paperId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found"));
        paper.setStatus(PaperStatus.ACCEPTED); // Assuming finalization means acceptance
        paperRepository.save(paper);
    }
}