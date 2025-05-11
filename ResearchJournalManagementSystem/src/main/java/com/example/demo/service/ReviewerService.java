package com.example.demo.service;

import com.example.demo.model.Paper;

public interface ReviewerService {
    void assignPaperToReviewer(Long paperId, Long reviewerId);
    void finalizePaper(Long paperId);
}